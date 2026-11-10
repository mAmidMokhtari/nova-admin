import { ThemeMode } from '@/types/Enums';

type ThemeColors = {
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  accentStrong: string;
  accentStrongHover: string;
  accentSoft: string;
  onAccent: string;
  danger: string;
  dangerSoft: string;
  success: string;
  successSoft: string;
  sidebar: string;
  sidebarText: string;
  sidebarTextActive: string;
  sidebarActive: string;
  overlay: string;
  focusRing: string;
};

export type AppTheme = {
  mode: ThemeMode;
  colors: ThemeColors;
  radii: { sm: string; md: string; lg: string; pill: string };
  shadows: { card: string; overlay: string };
  layout: { sidebarWidth: string; headerHeight: string; minWidth: string };
  fontFamily: string;
};

const shared = {
  radii: { sm: '8px', md: '12px', lg: '16px', pill: '999px' },
  layout: { sidebarWidth: '248px', headerHeight: '68px', minWidth: '1280px' },
  fontFamily: "'Vazirmatn', system-ui, -apple-system, 'Segoe UI', sans-serif",
} as const;

export const lightTheme: AppTheme = {
  ...shared,
  mode: ThemeMode.Light,
  colors: {
    background: '#f8f6f1',
    surface: '#ffffff',
    surfaceMuted: '#f3f0ea',
    border: '#e5e0d6',
    text: '#16213e',
    textMuted: '#5d6682',
    accent: '#f26b21',
    accentStrong: '#c9490b',
    accentStrongHover: '#b03f08',
    accentSoft: '#fdeadd',
    onAccent: '#ffffff',
    danger: '#c0392b',
    dangerSoft: '#fbe9e7',
    success: '#1c7c4d',
    successSoft: '#e3f4ea',
    sidebar: '#141d38',
    sidebarText: '#c3cade',
    sidebarTextActive: '#ffffff',
    sidebarActive: 'rgba(242, 107, 33, 0.18)',
    overlay: 'rgba(15, 22, 41, 0.55)',
    focusRing: '#f26b21',
  },
  shadows: {
    card: '0 1px 2px rgba(22, 33, 62, 0.06), 0 8px 24px rgba(22, 33, 62, 0.05)',
    overlay: '0 24px 64px rgba(15, 22, 41, 0.28)',
  },
};

export const darkTheme: AppTheme = {
  ...shared,
  mode: ThemeMode.Dark,
  colors: {
    background: '#0e1424',
    surface: '#172038',
    surfaceMuted: '#1f2a47',
    border: '#2c3859',
    text: '#eef1f8',
    textMuted: '#a3adc8',
    accent: '#f7803c',
    accentStrong: '#c9490b',
    accentStrongHover: '#dc5512',
    accentSoft: 'rgba(247, 128, 60, 0.16)',
    onAccent: '#ffffff',
    danger: '#ff8a7a',
    dangerSoft: 'rgba(255, 138, 122, 0.14)',
    success: '#5fd39a',
    successSoft: 'rgba(95, 211, 154, 0.14)',
    sidebar: '#0a0f1d',
    sidebarText: '#aab3cc',
    sidebarTextActive: '#ffffff',
    sidebarActive: 'rgba(247, 128, 60, 0.2)',
    overlay: 'rgba(4, 7, 15, 0.7)',
    focusRing: '#f7803c',
  },
  shadows: {
    card: '0 1px 2px rgba(0, 0, 0, 0.3)',
    overlay: '0 24px 64px rgba(0, 0, 0, 0.55)',
  },
};

export const themes: Record<ThemeMode, AppTheme> = {
  [ThemeMode.Light]: lightTheme,
  [ThemeMode.Dark]: darkTheme,
};
