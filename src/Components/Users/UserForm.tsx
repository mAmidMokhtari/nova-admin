import { Form, Formik } from 'formik';
import { useMemo } from 'react';

import { useDictionary } from '@/Dictionary';
import { Button } from '@/Shared/Button';
import { FormField } from '@/Shared/FormField';
import { FormActions, FormGrid } from '@/Shared/FormLayout';
import type { CreateUserPayload, UserFormValues } from '@/types';
import { Direction } from '@/types/Enums';
import { toEnglishDigits } from '@/Utils/numbers';
import { createUserSchema } from '@/Validations/user.schema';

type UserFormProps = {
  onSubmit: (payload: CreateUserPayload) => Promise<void>;
  onCancel: () => void;
};

const INITIAL_VALUES: UserFormValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  phone: '',
};

function toPayload(values: UserFormValues): CreateUserPayload {
  return {
    name: { firstname: values.firstName.trim(), lastname: values.lastName.trim() },
    username: values.username.trim(),
    email: values.email.trim(),
    password: values.password,
    phone: toEnglishDigits(values.phone.trim()),
  };
}

/** Create-user form: Formik state, Yup validation, typed payload on submit. */
export function UserForm({ onSubmit, onCancel }: UserFormProps) {
  const dictionary = useDictionary();
  const labels = dictionary.users.form;
  const validationSchema = useMemo(() => createUserSchema(dictionary), [dictionary]);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(toPayload(values))}
    >
      {({ isSubmitting }) => (
        <Form noValidate>
          <FormGrid>
            <FormField name="firstName" label={labels.firstName} autoComplete="off" />
            <FormField name="lastName" label={labels.lastName} autoComplete="off" />
            <FormField
              name="username"
              label={labels.username}
              autoComplete="off"
              dir={Direction.Ltr}
            />
            <FormField
              name="email"
              type="email"
              label={labels.email}
              autoComplete="off"
              inputMode="email"
              dir={Direction.Ltr}
            />
            <FormField
              name="password"
              type="password"
              label={labels.password}
              autoComplete="new-password"
              dir={Direction.Ltr}
            />
            <FormField
              name="phone"
              type="tel"
              label={labels.phone}
              placeholder={labels.phonePlaceholder}
              autoComplete="off"
              inputMode="tel"
              dir={Direction.Ltr}
            />
          </FormGrid>

          <FormActions>
            <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
              {dictionary.common.cancel}
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {dictionary.users.submit}
            </Button>
          </FormActions>
        </Form>
      )}
    </Formik>
  );
}
