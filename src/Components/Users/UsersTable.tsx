import { useMemo } from 'react';
import styled from 'styled-components';

import { useDictionary } from '@/Dictionary';
import { DataTable, type DataTableColumn } from '@/Shared/DataTable';
import type { User } from '@/types';
import { Direction } from '@/types/Enums';
import { getFullName } from '@/Utils/users';

type UsersTableProps = {
  users: readonly User[];
};

const Name = styled.span`
  font-weight: 600;
  text-transform: capitalize;
`;

/** Latin values such as emails keep their own direction but align with the column. */
const Technical = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.textMuted};
`;

/** User rows with name, username, email and phone. */
export function UsersTable({ users }: UsersTableProps) {
  const dictionary = useDictionary();

  const columns = useMemo<DataTableColumn<User>[]>(
    () => [
      {
        key: 'name',
        header: dictionary.users.columns.name,
        render: (user) => <Name dir="auto">{getFullName(user)}</Name>,
      },
      {
        key: 'username',
        header: dictionary.users.columns.username,
        render: (user) => <Technical dir={Direction.Ltr}>{user.username}</Technical>,
      },
      {
        key: 'email',
        header: dictionary.users.columns.email,
        render: (user) => <Technical dir={Direction.Ltr}>{user.email}</Technical>,
      },
      {
        key: 'phone',
        header: dictionary.users.columns.phone,
        render: (user) => <Technical dir={Direction.Ltr}>{user.phone}</Technical>,
      },
    ],
    [dictionary],
  );

  return (
    <DataTable
      caption={dictionary.users.title}
      columns={columns}
      rows={users}
      getRowKey={(user) => user.id}
    />
  );
}
