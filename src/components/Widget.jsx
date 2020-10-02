import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { ChartContext } from '../context/ChartContext';
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
  height: ${p => (p.chart ? `40em` : `auto`)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${p => p.theme.colors.grayLight};
  transition: all 0.2s ease-in-out;
  ${p => p.chart && `padding: 0 1.5em;`};
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
  ${p => p.theme.maxWidth.desktop`
    padding: 1.5em;
  `}
`;

const Widget = () => {
  const { state } = useContext(ChartContext);

  const [status, setStatus] = useState('idle');
  const [data, setData] = useState();

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    const fetchData = async () => {
      setStatus('fetching');
      try {
        const result = await axios.get(`/api/v1/currencies/eur/rates/today`);
        setStatus('fetched');
        setData(result.data.exchange_middle);
      } catch (e) {
        console.error(`😱 Axios request failed: ${e.response.status}`);
      }
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, []);

  console.log('status', status);
  console.log('data', data);

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
      {state && (state[0].trenutno > 1 || state[0].preporučeno > 1) && (
        <WidgetWrapper>
          <Container chart>
            <Chart data={state} />
          </Container>
        </WidgetWrapper>
      )}
    </Wrapper>
  );
};

export default Widget;
