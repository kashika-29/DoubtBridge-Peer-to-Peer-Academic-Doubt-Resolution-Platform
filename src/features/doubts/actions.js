import { getCurrentUser } from '@/lib/auth';
import { canClaimDoubt, canResolveDoubt } from '@/lib/permissions';
import { validateDoubtInput } from './validation';
import {
  createDoubtRecord,
  claimDoubtRecord,
  resolveDoubtRecord,
  getDoubtById,
} from './service';

export async function createDoubtAction(formData) {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    subject: formData.get('subject'),
    tags: formData.get('tags'),
    urgency: formData.get('urgency') || 'MEDIUM',
  };

  const validation = validateDoubtInput(data);
  if (!validation.isValid) {
    return { success: false, errors: validation.errors };
  }

  const doubt = await createDoubtRecord(data, user.id);
  return { success: true, doubtId: doubt.id };
}

export async function claimDoubtAction(doubtId) {
  const user = await getCurrentUser();
  if (!canClaimDoubt(user)) {
    throw new Error('Only verified peer helpers can claim doubts.');
  }

  const updated = await claimDoubtRecord(doubtId, user.id);
  return { success: true, doubt: updated };
}

export async function resolveDoubtAction(doubtId) {
  const user = await getCurrentUser();
  const doubt = await getDoubtById(doubtId);

  if (!canResolveDoubt(user, doubt)) {
    throw new Error('Only the author or an administrator can mark this doubt resolved.');
  }

  const updated = await resolveDoubtRecord(doubtId);
  return { success: true, doubt: updated };
}
