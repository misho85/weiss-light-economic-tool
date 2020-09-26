import React from 'react';
import styled, { css } from 'styled-components';
import CalcForm from './CalcForm';
import Chart from './Chart';

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
    height: ${p.chart ? `40em` : `auto`};
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

const chartData = [
  {
    time: 'trenutno',
    trenutno: 37,
    preporučeno: 142,
  },
  {
    time: 'Godina 1',
    trenutno: 119,
    preporučeno: 153,
  },
  {
    time: 'Godina 2',
    trenutno: 120,
    preporučeno: 27,
  },
  {
    time: 'Godina 3',
    trenutno: 190,
    preporučeno: 179,
  },
  {
    time: 'Godina 4',
    trenutno: 171,
    preporučeno: 52,
  },
  {
    time: 'Godina 5',
    trenutno: 91,
    preporučeno: 114,
  },
  {
    time: 'Godina 6',
    trenutno: 73,
    preporučeno: 128,
  },
  {
    time: 'Godina 7',
    trenutno: 73,
    preporučeno: 128,
  },
  {
    time: 'Godina 8',
    trenutno: 73,
    preporučeno: 128,
  },
  {
    time: 'Godina 9',
    trenutno: 73,
    preporučeno: 128,
  },
  {
    time: 'Godina 10',
    trenutno: 73,
    preporučeno: 128,
  },
];

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
      <WidgetWrapper>
        <Container chart>
          <Chart data={chartData} />
        </Container>
      </WidgetWrapper>
    </Wrapper>
  );
};

export default Widget;
