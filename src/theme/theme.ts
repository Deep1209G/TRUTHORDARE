import { createTheme } from '@shopify/restyle';

const theme = createTheme({
  colors: {
    background: '#120826',
    bgDeep: '#241249',
    surface: 'rgba(255,255,255,0.07)',
    border: 'rgba(255,255,255,0.12)',
    purple: '#7C5CFF',
    teal: '#2FE0C6',
    orange: '#FF8A4C',
    orangeDark: '#F06A2C',
    yellow: '#FFD23F',
    pink: '#FF6FA5',
    
    wood1: '#C98A4B',
    wood2: '#B4713A',
    wood3: '#8F5629',
    white: '#FFFFFF',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255,255,255,0.38)',
    transparent: 'transparent',
  },

  spacing: {
    0: 0,
    2: 2,
    3: 3,
    4: 4,
    6: 6,
    8: 8,
    10: 10,
    12: 12,
    14: 14,
    16: 16,
    18: 18,
    20: 20,
    22: 22,
    24: 24,
    32: 32,
    40: 40,
    48: 48,
    54: 54,
    60: 60,
    64: 64,
    80: 80,
  },

  borderRadii: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    phone: 46,
    circle: 999,
  },

  textVariants: {
    defaults: {
      fontSize: 14,
      color: 'white',
    },
    title: {
      fontFamily: 'Fredoka',
      fontSize: 22,
      fontWeight: '700',
      color: 'yellow',
    },
    header: {
      fontFamily: 'Fredoka',
      fontSize: 28,
      fontWeight: '700',
      color: 'white',
    },
    subtitle: {
      fontSize: 11,
      fontWeight: '700',
      color: 'textSecondary',
      letterSpacing: 2,
    },
    button: {
      fontFamily: 'Fredoka',
      fontSize: 20,
      fontWeight: '700',
      color: 'bgDeep',
    },
    small: {
      fontSize: 10,
      fontWeight: '800',
      color: 'white',
    },
  },

  sizes: {
    phoneWidth: 390,
    phoneHeight: 844,
    board: 300,
    boardRadius: 150,
    avatar: 44,
    bottle: 220,
    spinButton: 104,
    iconButton: 46,
  },

  players: [
    { name: 'Maya', color: '#FFD23F' },
    { name: 'Leo', color: '#2FE0C6' },
    { name: 'Priya', color: '#FF6FA5' },
    { name: 'Sam', color: '#FF8A4C' },
    { name: 'Zara', color: '#7C5CFF' },
    { name: 'Kai', color: '#8FF0E0' },
  ],

  animation: {
    spinDuration: 4200,
    idleDuration: 2400,
    bounceDuration: 2200,
    particles: 18,
    sparkleCount: 16,
    confettiCount: 14,
  },
});

export type Theme = typeof theme;

export default theme;
