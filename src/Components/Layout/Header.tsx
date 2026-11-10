import { LogOut, UserRound } from 'lucide-react';
import styled from 'styled-components';

import { useDictionary } from '@/Dictionary';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { loggedOut, selectSession } from '@/Redux/slices/authSlice';
import { Button } from '@/Shared/Button';
import { LocaleSwitch } from '@/Shared/Preferences/LocaleSwitch';
import { ThemeSwitch } from '@/Shared/Preferences/ThemeSwitch';

const Bar = styled.header`
  position: sticky;
  inset-block-start: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  block-size: ${({ theme }) => theme.layout.headerHeight};
  padding-inline: 32px;
  border-block-end: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const Account = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.span`
  display: grid;
  place-items: center;
  inline-size: 38px;
  block-size: 38px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accent};
`;

const Greeting = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;

const Username = styled.bdi`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

/** Top bar with the signed-in admin, language and theme switches, and sign out. */
export function Header() {
  const dispatch = useAppDispatch();
  const dictionary = useDictionary();
  const session = useAppSelector(selectSession);

  return (
    <Bar>
      <Account>
        <Avatar>
          <UserRound size={20} aria-hidden="true" />
        </Avatar>
        <Greeting>
          {dictionary.header.welcome} <Username>{session?.username}</Username>
        </Greeting>
      </Account>

      <Actions>
        <LocaleSwitch />
        <ThemeSwitch />
        <Button
          variant="ghost"
          icon={<LogOut size={18} aria-hidden="true" />}
          onClick={() => dispatch(loggedOut())}
        >
          {dictionary.auth.logout}
        </Button>
      </Actions>
    </Bar>
  );
}
