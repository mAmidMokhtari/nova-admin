import * as yup from 'yup';

import type { Dictionary } from '@/Dictionary';
import type { UserFormValues } from '@/types';
import { interpolate } from '@/Utils/formatters';
import { toEnglishDigits } from '@/Utils/numbers';

const NAME_MIN = 2;
const USERNAME_MIN = 3;
const PASSWORD_MIN = 8;
const USERNAME_PATTERN = /^[a-zA-Z0-9._]+$/;
const PHONE_PATTERN = /^\+?[0-9][0-9\s-]{6,17}$/;

/** Builds the create-user schema with messages of the active language. */
export function createUserSchema(dictionary: Dictionary): yup.ObjectSchema<UserFormValues> {
  const messages = dictionary.validation;
  const nameRule = yup
    .string()
    .trim()
    .required(messages.required)
    .min(NAME_MIN, interpolate(messages.minLength, { min: NAME_MIN }));

  return yup.object({
    firstName: nameRule,
    lastName: nameRule,
    username: yup
      .string()
      .trim()
      .required(messages.required)
      .min(USERNAME_MIN, interpolate(messages.minLength, { min: USERNAME_MIN }))
      .matches(USERNAME_PATTERN, messages.username),
    email: yup.string().trim().required(messages.required).email(messages.email),
    password: yup
      .string()
      .required(messages.required)
      .min(PASSWORD_MIN, interpolate(messages.minLength, { min: PASSWORD_MIN })),
    phone: yup
      .string()
      .trim()
      .required(messages.required)
      .test('phone', messages.phone, (value) => PHONE_PATTERN.test(toEnglishDigits(value ?? ''))),
  });
}
