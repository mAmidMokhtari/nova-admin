import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> & {
  /** Accessible name; icon-only buttons have no visible text. */
  label: string;
  children: ReactNode;
};

const StyledIconButton = styled.button`
  display: inline-grid;
  place-items: center;
  inline-size: 40px;
  block-size: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceMuted};
  }
`;

/** Square button that shows only an icon. */
export function IconButton({ label, type = 'button', children, ...rest }: IconButtonProps) {
  return (
    <StyledIconButton type={type} aria-label={label} title={label} {...rest}>
      {children}
    </StyledIconButton>
  );
}
