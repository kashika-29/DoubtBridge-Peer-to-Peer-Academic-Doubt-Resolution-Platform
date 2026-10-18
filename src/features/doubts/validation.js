/**
 * Validation schema and helpers for Doubts
 */

export function validateDoubtInput(data) {
  const errors = {};

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters long';
  }

  if (!data.description || typeof data.description !== 'string' || data.description.trim().length < 15) {
    errors.description = 'Description must provide sufficient detail (at least 15 characters)';
  }

  if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length === 0) {
    errors.subject = 'Please select an academic subject';
  }

  const validUrgencies = ['LOW', 'MEDIUM', 'HIGH'];
  if (data.urgency && !validUrgencies.includes(data.urgency)) {
    errors.urgency = 'Invalid urgency level';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
