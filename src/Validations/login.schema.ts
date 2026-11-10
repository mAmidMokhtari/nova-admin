import * as yup from 'yup';

import type { Dictionary } from '@/Dictionary';
import type { LoginPayload } from '@/types';

/** Builds the login schema with messages of the active language. */
export function createLoginSchema(dictionary: Dictionary): yup.ObjectSchema<LoginPayload> {
  const { required } = dictionary.validation;

  return yup.object({
    username: yup.string().trim().required(required),
    password: yup.string().required(required),
  });
}
