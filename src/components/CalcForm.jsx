import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { ChartContext } from '../context/ChartContext';
import Input from './Input';

const Wrapper = styled.form`
  width: 100%;
  height: 100%;
  border-radius: 2em;
  background-color: ${p => p.theme.colors.white};
  padding: 3% 8%;
`;

const Title = styled.h3`
  position: relative;
  text-align: center;
  text-transform: capitalize;
  margin: 0.5em;
  font-size: 2.5em;
  font-weight: bold;
`;

const BoxTitle = styled.h4`
  position: relative;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 1em;
  font-size: 1.8em;
  font-weight: bold;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${p => (p.top ? `space-around` : `space-between`)};
  margin: auto;
  ${p =>
    p.bottom &&
    p.theme.maxWidth.tablet`
    flex-direction: column;
    align-items: center;
  `}
  ${p => p.theme.maxWidth.phone`
    flex-direction: column;
    width: 22em;
  `}
`;

const BoxLeft = styled.div``;

const BoxRight = styled.div``;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1em;

  > p {
    font-size: 1.2em;
    margin-right: 1em;
  }
`;

const CostBox = styled.div`
  height: 2.4em;
  width: 22em;
  border-radius: 0.5em;
  background-color: ${p =>
    p.left ? p.theme.colors.redLight : p.theme.colors.greenLight};
  margin-bottom: 1em;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10% 0 3%;
`;

const CostLabel = styled.p`
  font-size: 1.3em;
  font-weight: bold;
  line-height: 1;
`;

const Cost = styled.p`
  font-size: 1.2em;
  font-weight: 600;
  line-height: 1;
`;

const NumberBox = styled.div`
  text-align: center;
  margin-top: 1.5em;

  > h2 {
    font-size: 2em;
    font-weight: 400;
    margin-bottom: 0.2em;
  }
  > h4 {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 0;
  }
`;

const validationSchema = yup.object().shape({
  kvadratura: yup.number().min(1).required('Kvadratura is required!'),
  visina: yup.number().min(1).required('Visina is required!'),
  lux: yup.number().min(1).required('Lux is required!'),
});

const roundToTwo = num => Math.round((num + Number.EPSILON) * 100) / 100;

const formatter = num =>
  new Intl.NumberFormat('sr', {
    style: 'currency',
    currency: 'RSD',

    // These options are needed to round to whole numbers.
    //minimumFractionDigits: 0,
    //maximumFractionDigits: 0,
  }).format(num);

const CalcForm = () => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { watch } = methods;

  const allFields = watch();

  const initTrosak1 =
    Object.keys(allFields).length === 0
      ? 0
      : allFields.brojSijalica1 * allFields.cenaSijalice1;

  const initTrosak2 =
    Object.keys(allFields).length === 0
      ? 0
      : allFields.brojSijalica2 * allFields.cenaSijalice2;

  const godTrosak1 =
    Object.keys(allFields).length === 0
      ? 0
      : allFields.cenaStruje *
        allFields.radniSati *
        allFields.brojSijalica1 *
        (allFields.snagaSijalice1 / 1000);

  const godTrosak2 =
    Object.keys(allFields).length === 0
      ? 0
      : allFields.cenaStruje *
        allFields.radniSati *
        allFields.brojSijalica2 *
        (allFields.snagaSijalice2 / 1000);

  const godUsteda = godTrosak1 - godTrosak2;

  const periodIsplativosti =
    godUsteda < 1
      ? `😱`
      : initTrosak2 - initTrosak1 < 0
      ? 0
      : roundToTwo((initTrosak2 - initTrosak1) / godUsteda);

  const { setState } = useContext(ChartContext);

  useEffect(() => {
    const yearData = [];
    for (let i = 1; i <= 10; i++) {
      yearData.push({
        time: `Godina ${i}`,
        trenutno: initTrosak1 + godTrosak1 * i,
        preporučeno: initTrosak2 + godTrosak2 * i,
      });
    }

    const chartData = [
      {
        time: 'trenutno',
        trenutno: initTrosak1,
        preporučeno: initTrosak2,
      },
      ...yearData,
    ];

    setState(chartData);
  }, [setState, initTrosak1, initTrosak2, godTrosak1, godTrosak2]);

  return (
    <FormProvider {...methods}>
      <Wrapper>
        <Box top>
          <BoxLeft>
            <InputBox>
              <p>Cena struje</p>
              <Input type="number" name="cenaStruje" required />
            </InputBox>
          </BoxLeft>
          <BoxRight>
            <InputBox>
              <p>Radni sati</p>
              <Input type="number" name="radniSati" required />
            </InputBox>
          </BoxRight>
        </Box>
        <Title>Rasveta</Title>
        <Box bottom>
          <BoxLeft>
            <BoxTitle>Trenutna</BoxTitle>
            <InputBox>
              <p>Broj sijalica</p>
              <Input type="number" name="brojSijalica1" required />
            </InputBox>
            <InputBox>
              <p>Vati po sijalici</p>
              <Input type="number" name="snagaSijalice1" required />
            </InputBox>
            <InputBox>
              <p>Cena po sijalici</p>
              <Input type="number" name="cenaSijalice1" required />
            </InputBox>
            <CostBox left>
              <CostLabel>Inicijalni troškovi</CostLabel>
              <Cost>{formatter(initTrosak1)}</Cost>
            </CostBox>
            <CostBox left>
              <CostLabel>Godišnji troškovi</CostLabel>
              <Cost>{formatter(godTrosak1)}</Cost>
            </CostBox>
          </BoxLeft>
          <BoxRight>
            <BoxTitle>Preporučena</BoxTitle>
            <InputBox>
              <p>Broj sijalica</p>
              <Input type="number" name="brojSijalica2" required />
            </InputBox>
            <InputBox>
              <p>Vati po sijalici</p>
              <Input type="number" name="snagaSijalice2" required />
            </InputBox>
            <InputBox>
              <p>Cena po sijalici</p>
              <Input type="number" name="cenaSijalice2" required />
            </InputBox>
            <CostBox>
              <CostLabel>Inicijalni troškovi</CostLabel>
              <Cost>{formatter(initTrosak2)}</Cost>
            </CostBox>
            <CostBox>
              <CostLabel>Godišnji troškovi</CostLabel>
              <Cost>{formatter(godTrosak2)}</Cost>
            </CostBox>
          </BoxRight>
        </Box>
        {godTrosak2 > 0 && (
          <Box>
            <NumberBox>
              <h2>{formatter(godUsteda)}</h2>
              <h4>Godišnja ušteda</h4>
            </NumberBox>
            <NumberBox>
              <h2>{periodIsplativosti} Godina</h2>
              <h4>Period isplativosti</h4>
            </NumberBox>
            <NumberBox>
              <h2>{formatter(godUsteda / 12)}</h2>
              <h4>Mesečna ušteda</h4>
            </NumberBox>
          </Box>
        )}
      </Wrapper>
    </FormProvider>
  );
};

export default CalcForm;
