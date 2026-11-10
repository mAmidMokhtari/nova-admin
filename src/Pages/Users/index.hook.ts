import { useEffect, useMemo, useState } from 'react';

import { useDictionary } from '@/Dictionary';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { selectLocale } from '@/Redux/slices/settingsSlice';
import { toastShown } from '@/Redux/slices/toastSlice';
import {
  createUser,
  fetchUsers,
  selectUsers,
  selectUsersError,
  selectUsersStatus,
} from '@/Redux/slices/usersSlice';
import type { CreateUserPayload } from '@/types';
import { RequestStatus, ToastType } from '@/types/Enums';
import { getErrorMessage } from '@/Utils/errors';
import { formatNumber, interpolate } from '@/Utils/formatters';
import { matchesQuery } from '@/Utils/search';
import { getFullName } from '@/Utils/users';

/** State and handlers of the users page. */
export function useUsersPage() {
  /* ---- State ---- */
  const dispatch = useAppDispatch();
  const dictionary = useDictionary();
  const locale = useAppSelector(selectLocale);
  const users = useAppSelector(selectUsers);
  const status = useAppSelector(selectUsersStatus);
  const errorCode = useAppSelector(selectUsersError);

  const [query, setQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const visibleUsers = useMemo(
    () =>
      users.filter((user) =>
        matchesQuery(query, [getFullName(user), user.username, user.email, user.phone]),
      ),
    [users, query],
  );

  const countLabel = interpolate(dictionary.users.count, {
    count: formatNumber(visibleUsers.length, locale),
  });

  /* ---- Handlers ---- */
  const handleRetry = (): void => {
    void dispatch(fetchUsers());
  };

  const handleCreate = async (payload: CreateUserPayload): Promise<void> => {
    try {
      await dispatch(createUser(payload)).unwrap();
      dispatch(toastShown(ToastType.Success, dictionary.users.created));
      setIsCreateOpen(false);
    } catch (error) {
      dispatch(toastShown(ToastType.Error, getErrorMessage(error, dictionary)));
    }
  };

  /* ---- LifeCycles ---- */
  // Fetch once per session: a refetch would drop the rows the mock API did not persist.
  useEffect(() => {
    if (status === RequestStatus.Idle) void dispatch(fetchUsers());
  }, [dispatch, status]);

  /* ---- Return ---- */
  return {
    dictionary,
    query,
    setQuery,
    visibleUsers,
    countLabel,
    isLoading: status === RequestStatus.Idle || status === RequestStatus.Loading,
    errorMessage: status === RequestStatus.Failed ? getErrorMessage(errorCode, dictionary) : null,
    isEmpty: users.length === 0,
    isCreateOpen,
    openCreate: () => setIsCreateOpen(true),
    closeCreate: () => setIsCreateOpen(false),
    handleCreate,
    handleRetry,
  };
}
