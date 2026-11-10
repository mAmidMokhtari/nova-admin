import 'styled-components';

import type { AppTheme } from './theme';

declare module 'styled-components' {
  // Declaration merging requires an interface here.
  export interface DefaultTheme extends AppTheme {}
}
