import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import { GlobalStyle } from './styles';
import { ChartProvider } from './context/ChartContext';
import SEO from './components/SEO';
import Widget from './components/Widget';
import { PageOrnament } from './graphics';
import config from './config';

const Wrapper = styled.div`
  width: auto;
  height: auto;
  padding: 5% 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${p => p.theme.maxWidth.large`
    padding: 5%;
  `}
  ${p => p.theme.maxWidth.desktop`
    padding: 5% 0;
  `}
`;

const Ornament = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  > svg {
    width: 46em;
    height: 23em;
    ${p => p.theme.maxWidth.desktop`
      width: 40em;
      height: 20em;
    `}
    ${p => p.theme.maxWidth.tablet`
      width: 34em;
      height: 17em;
    `}
  }

  ${p => p.theme.maxWidth.phone`
    display: none;
  `}
`;

function App() {
  useEffect(() => {
    ReactGA.initialize(config.googleAnalyticsID);
    ReactGA.pageview(window.location.pathname);
  });

  return (
    <Wrapper>
      <SEO />
      <GlobalStyle />
      <ChartProvider>
        <Ornament>
          <PageOrnament />
        </Ornament>
        <Widget />
      </ChartProvider>
    </Wrapper>
  );
}

export default App;
