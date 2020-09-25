import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles';
import Widget from './components/Widget';

const Wrapper = styled.div`
  width: auto;
  height: auto;
  padding: 5% 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Wrapper>
      <GlobalStyle />
      <Widget />
    </Wrapper>
  );
}

export default App;
