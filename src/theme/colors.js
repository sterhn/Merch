export const THEMES = {
  light: {
    bg: '#FFF8F0',
    surface: '#FFFFFF',
    surfaceAlt: '#FFF1E6',
    cardSurface: '#FFFFFF',
    cardSurfaceEnd: '#FFFFFF',
    ink: '#3A2E2A',
    ink2: '#7A6A62',
    ink3: '#B5A89F',
    line: '#F2E6D8',
    lineSoft: '#FAF0E4',
    mint: '#62B995',      mintSoft: '#D0FAE6',
    butter: '#E3CA69',    butterSoft: '#FFF6C8',
    sky: '#65AFD2',       skySoft: '#D4F4FF',
    coral: '#E06351',     coralSoft: '#FFE3DB',
    lavender: '#AA95E8',  lavenderSoft: '#F0E9FF',
    metricGrad1: null,
    metricGrad2: null,
    heroGrad: null,
  },
  dark: {
    bg: '#18141F',
    surface: '#251F2E',
    surfaceAlt: '#2D2440',
    cardSurface: '#2E2642',
    cardSurfaceEnd: '#231D33',
    ink: '#F0E8FF',
    ink2: '#C0AADC',
    ink3: '#7C6E95',
    line: '#3D3058',
    lineSoft: '#2D2444',
    mint: '#00EEAD',      mintSoft: '#002715',
    butter: '#FBD530',    butterSoft: '#332100',
    sky: '#2ADCFF',       skySoft: '#001F3B',
    coral: '#FF876F',     coralSoft: '#490000',
    lavender: '#CFA5FF',  lavenderSoft: '#260650',
    metricGrad1: ['#002715', '#001028'],
    metricGrad2: ['#3D0A00', '#1A0A1A'],
    heroGrad: ['#7640A0', '#4B3090', '#2040A0'],
  },
};

export const ACCENTS = {
  pink: {
    light: { primary: '#BF5DA2', primarySoft: '#FDEDF8', primaryBorder: '#EAB8DC' },
    dark:  { primary: '#FF8AEC', primarySoft: '#38003A', primaryBorder: '#9E2A8A',
             heroGrad: ['#8A1A60', '#6B1A8A', '#3A2890'] },
  },
  lavender: {
    light: { primary: '#8E71D6', primarySoft: '#F3EDFF', primaryBorder: '#D4C7FF' },
    dark:  { primary: '#CFA5FF', primarySoft: '#260650', primaryBorder: '#683EB6',
             heroGrad: ['#7640A0', '#4B3090', '#2040A0'] },
  },
  mint: {
    light: { primary: '#00A16F', primarySoft: '#D0FAE6', primaryBorder: '#85D9B8' },
    dark:  { primary: '#00EBA3', primarySoft: '#002715', primaryBorder: '#00855C',
             heroGrad: ['#006845', '#2A4800', '#005060'] },
  },
  coral: {
    light: { primary: '#D15D4D', primarySoft: '#FFE3DB', primaryBorder: '#F5B5AC' },
    dark:  { primary: '#FF8972', primarySoft: '#490000', primaryBorder: '#B83020',
             heroGrad: ['#A03518', '#8C1040', '#503080'] },
  },
  sky: {
    light: { primary: '#0094CE', primarySoft: '#D4F4FF', primaryBorder: '#8ACDE8' },
    dark:  { primary: '#00D8FF', primarySoft: '#001F3B', primaryBorder: '#006888',
             heroGrad: ['#1848A8', '#0C3090', '#204090'] },
  },
};

export function buildTheme(dark, accentKey = 'lavender') {
  const base = { ...THEMES[dark ? 'dark' : 'light'] };
  const accent = ACCENTS[accentKey]?.[dark ? 'dark' : 'light'] || {};
  return { ...base, ...accent };
}
