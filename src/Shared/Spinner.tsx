import styled, { keyframes } from 'styled-components';

type SpinnerProps = {
  /** Diameter in pixels. */
  size?: number;
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Ring = styled.span<{ $size: number }>`
  display: inline-block;
  inline-size: ${({ $size }) => $size}px;
  block-size: ${({ $size }) => $size}px;
  border: 2px solid currentColor;
  border-block-start-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

/** Decorative loading ring; pair it with visible or `aria-live` text. */
export function Spinner({ size = 20 }: SpinnerProps) {
  return <Ring $size={size} aria-hidden="true" />;
}
