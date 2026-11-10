import { useEffect } from 'react';

import { useDictionary } from '@/Dictionary';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { login, loginErrorCleared, selectLoginError } from '@/Redux/slices/authSlice';
import type { LoginPayload } from '@/types';
import { ApiErrorCode } from '@/types/Enums';

/** State and handlers of the login page. */
export function useLoginPage() {
  /* ---- State ---- */
  const dispatch = useAppDispatch();
  const dictionary = useDictionary();
  const errorCode = useAppSelector(selectLoginError);

  // On this endpoint a 401 means wrong credentials, not an expired session.
  const errorMessage =
    errorCode === null
      ? null
      : errorCode === ApiErrorCode.Unauthorized
        ? dictionary.auth.invalidCredentials
        : dictionary.errors[errorCode];

  /* ---- Handlers ---- */
  const handleSubmit = async (values: LoginPayload): Promise<void> => {
    // A successful login updates the store; the guest route guard then redirects.
    await dispatch(login({ username: values.username.trim(), password: values.password }));
  };

  /* ---- LifeCycles ---- */
  useEffect(
    () => () => {
      dispatch(loginErrorCleared());
    },
    [dispatch],
  );

  /* ---- Return ---- */
  return { dictionary, errorMessage, handleSubmit };
}
