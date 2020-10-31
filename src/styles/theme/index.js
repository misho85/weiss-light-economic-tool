import colors from './colors';
import fonts from './fonts';
import responsive from './responsive';
import zIndexes from './zIndexes';

const theme = {
  fonts,
  colors,
  zIndexes,
  headerHeight: `6em`, // 124px
  headerPhoneHeight: `6em`,
  containerWidth: `85em`, // 1360px
  ...responsive,
};

export default theme;
