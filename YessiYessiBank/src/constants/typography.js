import {Platform} from 'react-native';
import {COLORS} from './colors';

export const FONT_SIZES = {
  h1: 32,
  h2: 24,
  h3: 20,
  large: 18,
  medium: 16,
  small: 14,
  tiny: 12,
};

export const FONT_WEIGHTS = {
  bold: '700',
  medium: '500',
  regular: '400',
};

// Exemples de styles de texte que nous pourrons utiliser dans l'application
export const TEXT_STYLES = {
  h1: {
    fontSize: FONT_SIZES.h1,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  h2: {
    fontSize: FONT_SIZES.h2,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  body: {
    fontSize: FONT_SIZES.medium,
    fontWeight: FONT_WEIGHTS.regular,
    color: COLORS.text,
  },
  button: {
    fontSize: FONT_SIZES.large,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
};
