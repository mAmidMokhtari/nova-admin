import styled from 'styled-components';

import { LoginForm } from '@/Components/Login/LoginForm';
import { Card } from '@/Shared/Card';
import { Logo } from '@/Shared/Logo';
import { LocaleSwitch } from '@/Shared/Preferences/LocaleSwitch';
import { ThemeSwitch } from '@/Shared/Preferences/ThemeSwitch';

import { useLoginPage } from './index.hook';

const Page = styled.main`
  display: grid;
  place-items: center;
  min-block-size: 100vh;
  padding: 24px;
`;

const Preferences = styled.div`
  position: fixed;
  inset-block-start: 24px;
  inset-inline-end: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LoginCard = styled(Card)`
  inline-size: 420px;
  padding: 36px;
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-block-end: 28px;
  text-align: center;
`;

const Title = styled.h1`
  margin-block-start: 10px;
  font-size: 20px;
  font-weight: 800;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
`;

/** Public sign-in page of the panel. */
export function LoginPage() {
  const { dictionary, errorMessage, handleSubmit } = useLoginPage();

  return (
    <Page>
      <Preferences>
        <LocaleSwitch />
        <ThemeSwitch />
      </Preferences>

      <LoginCard>
        <Intro>
          <Logo />
          <Title>{dictionary.auth.title}</Title>
          <Subtitle>{dictionary.auth.subtitle}</Subtitle>
        </Intro>
        <LoginForm errorMessage={errorMessage} onSubmit={handleSubmit} />
      </LoginCard>
    </Page>
  );
}
