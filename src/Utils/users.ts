import type { User } from '@/types';

/** First and last name joined for display and search. */
export function getFullName(user: Pick<User, 'name'>): string {
  return `${user.name.firstname} ${user.name.lastname}`.trim();
}
