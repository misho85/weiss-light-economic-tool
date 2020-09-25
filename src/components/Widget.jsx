import React from 'react';
import styled, { css } from 'styled-components';
import CalcForm from './CalcForm';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WidgetWrapper = styled.div`
  width: 100%;
`;

const TitleBox = styled.div`
  text-align: end;
  padding-right: 10%;
  margin-bottom: 0.5em;

  > span {
    font-size: 2em;
    text-transform: uppercase;
  }
`;

const Brand = styled.span`
  font-weight: 300;
`;
const Name = styled.span`
  font-weight: 600;
`;

const Container = styled.div`
  width: 100%;
  height: 40em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${p => p.theme.colors.grayLight};
  transition: all 0.2s ease-in-out;
  ${p => p.theme.maxWidth.phone`
    height: auto;
  `}

  ${p =>
    p.topBorder &&
    css`
      border-top: 0.5em solid ${p.theme.colors.greenLight};
    `}
`;

const Box = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5em 4.5em;
  ${p => p.theme.maxWidth.phone`
    padding: 1em;
  `}
`;

const Widget = () => {
  return (
    <Wrapper>
      <WidgetWrapper>
        <TitleBox>
          <Brand>Weiss light </Brand>
          <Name>Economic</Name>
        </TitleBox>
        <Container topBorder>
          <Box>
            <CalcForm />
          </Box>
        </Container>
      </WidgetWrapper>
    </Wrapper>
  );
};

export default Widget;
