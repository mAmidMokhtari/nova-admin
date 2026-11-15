import { useFormikContext } from 'formik';
import { useEffect } from 'react';

import { useDictionary } from '@/Dictionary';

/**
 * Formik stores validation messages as plain strings, so messages that are already
 * on screen stay in the old language after a switch. Render this inside a `<Form>`
 * to validate again, with the schema of the new language, whenever it changes.
 */
export function RevalidateOnLanguageChange() {
  const dictionary = useDictionary();
  const { touched, validateForm } = useFormikContext();
  const hasTouchedField = Object.keys(touched).length > 0;

  useEffect(() => {
    // An untouched form shows no messages, so there is nothing to translate.
    if (hasTouchedField) void validateForm();
  }, [dictionary, hasTouchedField, validateForm]);

  return null;
}
