import { useField } from 'formik';
import { useId, type HTMLInputTypeAttribute, type ReactNode } from 'react';
import styled, { css } from 'styled-components';

import type { Direction } from '@/types/Enums';

export type FormFieldOption = {
  value: string;
  label: string;
};

type FormFieldProps = {
  /** Formik field name. */
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'decimal' | 'tel' | 'email' | 'url';
  /** Forces the text direction, e.g. LTR for emails and URLs inside an RTL form. */
  dir?: Direction;
  /** Renders a textarea. */
  multiline?: boolean;
  /** Renders a select with these options. */
  options?: readonly FormFieldOption[];
  /** Element placed at the inline end of the control, e.g. a show-password button. */
  trailing?: ReactNode;
  disabled?: boolean;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
`;

const controlStyles = css<{ $invalid: boolean }>`
  inline-size: 100%;
  min-block-size: 44px;
  padding-block: 9px;
  padding-inline: 14px;
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Control = styled.div`
  position: relative;
`;

const Input = styled.input<{ $invalid: boolean; $hasTrailing: boolean }>`
  ${controlStyles}
  padding-inline-end: ${({ $hasTrailing }) => ($hasTrailing ? '48px' : '14px')};
`;

const TextArea = styled.textarea<{ $invalid: boolean }>`
  ${controlStyles}
  min-block-size: 96px;
  resize: vertical;
`;

const Select = styled.select<{ $invalid: boolean }>`
  ${controlStyles}
`;

const Trailing = styled.div`
  position: absolute;
  inset-block: 0;
  inset-inline-end: 6px;
  display: flex;
  align-items: center;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 13px;
`;

/** Labelled Formik control (input, textarea or select) with its validation message. */
export function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  dir,
  multiline = false,
  options,
  trailing,
  disabled,
}: FormFieldProps) {
  const [field, meta] = useField<string>(name);
  const id = useId();
  const errorId = `${id}-error`;
  const error = meta.touched ? meta.error : undefined;
  const invalid = error !== undefined;

  const shared = {
    ...field,
    id,
    disabled,
    'aria-invalid': invalid,
    'aria-describedby': invalid ? errorId : undefined,
  };

  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      {/* Direction is set on the wrapper so the control and its trailing slot agree. */}
      <Control dir={dir}>
        {options ? (
          <Select {...shared} $invalid={invalid}>
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        ) : multiline ? (
          <TextArea {...shared} placeholder={placeholder} $invalid={invalid} />
        ) : (
          <Input
            {...shared}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            inputMode={inputMode}
            $invalid={invalid}
            $hasTrailing={trailing !== undefined}
          />
        )}
        {trailing && <Trailing>{trailing}</Trailing>}
      </Control>
      {invalid && (
        <ErrorText id={errorId} role="alert">
          {error}
        </ErrorText>
      )}
    </Wrapper>
  );
}
