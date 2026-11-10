import { Search, X } from 'lucide-react';
import styled from 'styled-components';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  /** Used as placeholder and accessible name. */
  placeholder: string;
  clearLabel: string;
};

const Wrapper = styled.div`
  position: relative;
  inline-size: 340px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Icon = styled(Search)`
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 14px;
  transform: translateY(-50%);
  pointer-events: none;
`;

const Input = styled.input`
  inline-size: 100%;
  block-size: 42px;
  padding-inline: 42px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &::-webkit-search-cancel-button {
    display: none;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  inset-block-start: 50%;
  inset-inline-end: 8px;
  display: grid;
  place-items: center;
  inline-size: 28px;
  block-size: 28px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transform: translateY(-50%);

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

/** Controlled search box with a clear button. */
export function SearchInput({ value, onChange, placeholder, clearLabel }: SearchInputProps) {
  return (
    <Wrapper role="search">
      <Icon size={18} aria-hidden="true" />
      <Input
        type="search"
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {value !== '' && (
        <ClearButton type="button" aria-label={clearLabel} onClick={() => onChange('')}>
          <X size={16} aria-hidden="true" />
        </ClearButton>
      )}
    </Wrapper>
  );
}
