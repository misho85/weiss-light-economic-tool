import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles';
import { ChartProvider } from './context/ChartContext';
import Widget from './components/Widget';
import { PageOrnament } from './graphics';

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
  return (
    <Wrapper>
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
