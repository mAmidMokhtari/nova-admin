import { createGlobalStyle } from 'styled-components';

import vazirmatn from '@/assets/Fonts/Vazirmatn-Variable.woff2';

/** Reset, font face and document-level styles driven by the active theme. */
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Vazirmatn';
    src: url(${vazirmatn}) format('woff2');
    font-weight: 100 900;
    font-display: swap;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    color-scheme: ${({ theme }) => theme.mode};
  }

  body {
    margin: 0;
    min-width: ${({ theme }) => theme.layout.minWidth};
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: 15px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
