import type { CreateUserPayload, CreateUserResponse, User } from '@/types';
import { axiosInstance } from '@/Utils/api/axiosInstance';
import { ENDPOINTS } from '@/Utils/api/endpoints';

/** Fetches every user. */
export async function getUsers(): Promise<User[]> {
  const { data } = await axiosInstance.get<User[]>(ENDPOINTS.users);
  return data;
}

/**
 * Creates a user. The mock API answers with the new id only, so the submitted
 * fields are merged in here; the password is never kept on the client.
 */
export async function createUser(payload: CreateUserPayload): Promise<User> {
  const { data } = await axiosInstance.post<CreateUserResponse>(ENDPOINTS.users, payload);
  const { password: _password, ...user } = payload;

  return { ...user, id: data.id };
}
