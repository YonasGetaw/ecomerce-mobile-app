import { FONTS } from '../colors';

export const typography = {
  h1: {
    fontSize: FONTS.sizes.huge,
    fontFamily: FONTS.bold,
    lineHeight: 48,
    letterSpacing: -0.5
  },
  
  h2: {
    fontSize: FONTS.sizes.xxxlarge,
    fontFamily: FONTS.bold,
    lineHeight: 36,
    letterSpacing: -0.3
  },
  
  h3: {
    fontSize: FONTS.sizes.xxlarge,
    fontFamily: FONTS.semiBold,
    lineHeight: 30,
    letterSpacing: -0.2
  },
  
  h4: {
    fontSize: FONTS.sizes.xlarge,
    fontFamily: FONTS.semiBold,
    lineHeight: 27
  },
  
  h5: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.medium,
    lineHeight: 24
  },
  
  body1: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.regular,
    lineHeight: 24
  },
  
  body2: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    lineHeight: 21
  },
  
  body3: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    lineHeight: 18
  },
  
  button: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.medium,
    lineHeight: 24,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  
  caption: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    lineHeight: 16,
    letterSpacing: 0.2
  },
  
  overline: {
    fontSize: 10,
    fontFamily: FONTS.medium,
    lineHeight: 12,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  
  price: {
    large: {
      fontSize: FONTS.sizes.xxxlarge,
      fontFamily: FONTS.bold,
      lineHeight: 40
    },
    medium: {
      fontSize: FONTS.sizes.xlarge,
      fontFamily: FONTS.bold,
      lineHeight: 27
    },
    small: {
      fontSize: FONTS.sizes.large,
      fontFamily: FONTS.bold,
      lineHeight: 24
    }
  }
};