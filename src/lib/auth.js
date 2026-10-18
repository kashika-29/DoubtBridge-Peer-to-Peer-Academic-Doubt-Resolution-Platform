/**
 * Authentication helpers and session resolution
 */

export async function getCurrentUser() {
  // In a full implementation, read session from cookies or JWT / NextAuth session
  // For development boilerplate, fallback to mock or header-based user
  return {
    id: 'user_dev_alex',
    name: 'Alex Rivera',
    email: 'alex@doubtbridge.edu',
    role: 'STUDENT',
    reputation: 150,
  };
}

export function isAuthenticated(user) {
  return Boolean(user && user.id);
}
