import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

const useStyledTheme = () => useContext(ThemeContext) || {};

export default useStyledTheme;
