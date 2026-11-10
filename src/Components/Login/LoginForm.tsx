import { Form, Formik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import { useDictionary } from '@/Dictionary';
import { Button } from '@/Shared/Button';
import { FormField } from '@/Shared/FormField';
import type { LoginPayload } from '@/types';
import { Direction } from '@/types/Enums';
import { createLoginSchema } from '@/Validations/login.schema';

type LoginFormProps = {
  /** Translated failure of the last attempt, if any. */
  errorMessage: string | null;
  onSubmit: (values: LoginPayload) => Promise<void>;
};

const INITIAL_VALUES: LoginPayload = { username: '', password: '' };

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-block-end: 22px;
`;

const ErrorBanner = styled.p`
  margin-block-end: 16px;
  padding-block: 10px;
  padding-inline: 14px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.dangerSoft};
  color: ${({ theme }) => theme.colors.danger};
  font-size: 14px;
`;

const RevealButton = styled.button`
  display: grid;
  place-items: center;
  inline-size: 34px;
  block-size: 34px;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
`;

/** Username and password form of the login page. */
export function LoginForm({ errorMessage, onSubmit }: LoginFormProps) {
  const dictionary = useDictionary();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const validationSchema = useMemo(() => createLoginSchema(dictionary), [dictionary]);

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form noValidate>
          {errorMessage && <ErrorBanner role="alert">{errorMessage}</ErrorBanner>}

          <Fields>
            <FormField
              name="username"
              label={dictionary.auth.username}
              placeholder={dictionary.auth.usernamePlaceholder}
              autoComplete="username"
              dir={Direction.Ltr}
            />
            <FormField
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              label={dictionary.auth.password}
              placeholder={dictionary.auth.passwordPlaceholder}
              autoComplete="current-password"
              dir={Direction.Ltr}
              trailing={
                <RevealButton
                  type="button"
                  aria-pressed={isPasswordVisible}
                  aria-label={
                    isPasswordVisible ? dictionary.auth.hidePassword : dictionary.auth.showPassword
                  }
                  onClick={() => setIsPasswordVisible((visible) => !visible)}
                >
                  {isPasswordVisible ? (
                    <EyeOff size={18} aria-hidden="true" />
                  ) : (
                    <Eye size={18} aria-hidden="true" />
                  )}
                </RevealButton>
              }
            />
          </Fields>

          <Button type="submit" fullWidth isLoading={isSubmitting}>
            {isSubmitting ? dictionary.auth.submitting : dictionary.auth.submit}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
