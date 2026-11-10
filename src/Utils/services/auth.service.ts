import type { LoginPayload, LoginResponse } from '@/types';
import { axiosInstance } from '@/Utils/api/axiosInstance';
import { ENDPOINTS } from '@/Utils/api/endpoints';

/** Exchanges admin credentials for a token. */
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await axiosInstance.post<LoginResponse>(ENDPOINTS.login, payload);
  return data;
}
