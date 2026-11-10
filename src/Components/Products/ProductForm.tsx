import { Form, Formik } from 'formik';
import { useMemo } from 'react';

import { useDictionary } from '@/Dictionary';
import { Button } from '@/Shared/Button';
import { FormField, type FormFieldOption } from '@/Shared/FormField';
import { FormActions, FormGrid, FormGridFull } from '@/Shared/FormLayout';
import type { CreateProductPayload, ProductFormValues } from '@/types';
import { Direction } from '@/types/Enums';
import { parseLocalizedNumber } from '@/Utils/numbers';
import { createProductSchema } from '@/Validations/product.schema';

type ProductFormProps = {
  categories: readonly string[];
  onSubmit: (payload: CreateProductPayload) => Promise<void>;
  onCancel: () => void;
};

const INITIAL_VALUES: ProductFormValues = {
  title: '',
  description: '',
  price: '',
  category: '',
  image: '',
};

function toPayload(values: ProductFormValues): CreateProductPayload {
  return {
    title: values.title.trim(),
    description: values.description.trim(),
    price: parseLocalizedNumber(values.price),
    category: values.category,
    image: values.image.trim(),
  };
}

/** Create-product form: Formik state, Yup validation, typed payload on submit. */
export function ProductForm({ categories, onSubmit, onCancel }: ProductFormProps) {
  const dictionary = useDictionary();
  const labels = dictionary.products.form;
  const validationSchema = useMemo(() => createProductSchema(dictionary), [dictionary]);
  const categoryOptions = useMemo<FormFieldOption[]>(
    () => categories.map((category) => ({ value: category, label: category })),
    [categories],
  );

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(toPayload(values))}
    >
      {({ isSubmitting }) => (
        <Form noValidate>
          <FormGrid>
            <FormGridFull>
              <FormField name="title" label={labels.title} placeholder={labels.titlePlaceholder} />
            </FormGridFull>
            <FormGridFull>
              <FormField
                name="description"
                label={labels.description}
                placeholder={labels.descriptionPlaceholder}
                multiline
              />
            </FormGridFull>
            <FormField
              name="price"
              label={labels.price}
              placeholder={labels.pricePlaceholder}
              inputMode="decimal"
              dir={Direction.Ltr}
            />
            <FormField
              name="category"
              label={labels.category}
              placeholder={labels.categoryPlaceholder}
              options={categoryOptions}
            />
            <FormGridFull>
              <FormField
                name="image"
                type="url"
                label={labels.image}
                placeholder={labels.imagePlaceholder}
                inputMode="url"
                dir={Direction.Ltr}
              />
            </FormGridFull>
          </FormGrid>

          <FormActions>
            <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
              {dictionary.common.cancel}
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {dictionary.products.submit}
            </Button>
          </FormActions>
        </Form>
      )}
    </Formik>
  );
}
