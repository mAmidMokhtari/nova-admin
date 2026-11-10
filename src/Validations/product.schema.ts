import * as yup from 'yup';

import type { Dictionary } from '@/Dictionary';
import type { ProductFormValues } from '@/types';
import { interpolate } from '@/Utils/formatters';
import { parseLocalizedNumber } from '@/Utils/numbers';

const TITLE_MIN = 3;
const TITLE_MAX = 120;
const DESCRIPTION_MIN = 10;
const HTTP_URL_PATTERN = /^https?:\/\//i;

/** Builds the create-product schema with messages of the active language. */
export function createProductSchema(dictionary: Dictionary): yup.ObjectSchema<ProductFormValues> {
  const messages = dictionary.validation;

  return yup.object({
    title: yup
      .string()
      .trim()
      .required(messages.required)
      .min(TITLE_MIN, interpolate(messages.minLength, { min: TITLE_MIN }))
      .max(TITLE_MAX, interpolate(messages.maxLength, { max: TITLE_MAX })),
    description: yup
      .string()
      .trim()
      .required(messages.required)
      .min(DESCRIPTION_MIN, interpolate(messages.minLength, { min: DESCRIPTION_MIN })),
    price: yup
      .string()
      .trim()
      .required(messages.required)
      .test('positive-number', messages.positiveNumber, (value) => {
        const price = parseLocalizedNumber(value ?? '');
        return Number.isFinite(price) && price > 0;
      }),
    category: yup.string().required(messages.required),
    image: yup
      .string()
      .trim()
      .required(messages.required)
      .matches(HTTP_URL_PATTERN, messages.url)
      .url(messages.url),
  });
}
