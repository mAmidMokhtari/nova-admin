import styled from 'styled-components';

import { useDictionary } from '@/Dictionary';

type LogoProps = {
  /** Use on dark surfaces such as the sidebar. */
  inverted?: boolean;
};

const Wrapper = styled.span<{ $inverted: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme, $inverted }) => ($inverted ? '#ffffff' : theme.colors.text)};
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1;
`;

const Bag = styled.svg`
  inline-size: 28px;
  block-size: 28px;
  flex-shrink: 0;
`;

/** NOVA wordmark with the orange shopping-bag mark. */
export function Logo({ inverted = false }: LogoProps) {
  const dictionary = useDictionary();

  return (
    <Wrapper $inverted={inverted} dir="ltr">
      <Bag viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M11 11V9a5 5 0 0 1 10 0v2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path d="M6.5 11h19l1.5 15a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z" fill="#f26b21" />
      </Bag>
      {dictionary.common.brand}
    </Wrapper>
  );
}
