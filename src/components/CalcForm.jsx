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
    p.top &&
    p.theme.maxWidth.large`
    flex-direction: column;
    width: 22em;
  `}
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
    font-size: 1.3em;
    font-weight: bold;
    margin-bottom: 0;
    text-transform: capitalize;
  }
`;

const validationSchema = yup.object().shape({
  cenaStruje: yup.number().min(1).required('Cena struje is required!'),
  radniDani: yup.number().min(1).required('Radni dani is required!'),
  radniSati: yup.number().min(1).required('Radni sati is required!'),
  brojSijalica1: yup.number().min(1).required('Broj sijalica is required!'),
  brojSijalica2: yup.number().min(1).required('Broj sijalica is required!'),
  snagaSijalice1: yup.number().min(1).required('Snaga sijalice is required!'),
  cenaSijalice1: yup.number().min(1).required('Cena sijalice is required!'),
  cenaSijalice2: yup.number().min(1).required('Cena sijalice is required!'),
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

// const formatterEur = num =>
//   new Intl.NumberFormat('de-DE', {
//     style: 'currency',
//     currency: 'EUR',
//   }).format(num);

// const CalcForm = ({ exchangeRate }) => {
const CalcForm = () => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { watch, setValue } = methods;

  const allFields = watch();

  useEffect(() => {
    if (Object.keys(allFields).length > 0) {
      if (allFields.radniDani < 0) setValue('radniDani', 0);
      if (allFields.radniDani > 7) setValue('radniDani', 7);
    }

    if (Object.keys(allFields).length > 0) {
      if (allFields.radniSati < 0) setValue('radniSati', 0);
      if (allFields.radniSati > 24) setValue('radniSati', 24);
    }
  }, [setValue, allFields]);

  const radniSati = 52 * allFields.radniDani * allFields.radniSati;

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
        radniSati *
        allFields.brojSijalica1 *
        (allFields.snagaSijalice1 / 1000);

  const godTrosak2 =
    Object.keys(allFields).length === 0
      ? 0
      : allFields.cenaStruje *
        radniSati *
        allFields.brojSijalica2 *
        (allFields.snagaSijalice2 / 1000);

  // const godUsteda = (godTrosak1 - godTrosak2) / exchangeRate;
  const godUsteda = godTrosak1 - godTrosak2;
  const mesUsteda = godUsteda / 12;

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
        trenutno: roundToTwo(initTrosak1 + godTrosak1 * i),
        preporučeno: roundToTwo(initTrosak2 + godTrosak2 * i),
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
          <div>
            <InputBox>
              <p>Cena struje</p>
              <Input
                type="number"
                name="cenaStruje"
                placeholder="RSD/kW"
                required
              />
            </InputBox>
          </div>
          <div>
            <InputBox>
              <p>Radni dani</p>
              <Input
                type="number"
                name="radniDani"
                placeholder="Nedeljno"
                required
              />
            </InputBox>
          </div>
          <div>
            <InputBox>
              <p>Radni sati</p>
              <Input
                type="number"
                name="radniSati"
                placeholder="Dnevno"
                required
              />
            </InputBox>
          </div>
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
              {/* <h2>{formatterEur(godUsteda)}</h2> */}
              <h2>{formatter(godUsteda)}</h2>
              <h4>Godišnja ušteda</h4>
            </NumberBox>
            <NumberBox>
              <h2>{periodIsplativosti} Godina</h2>
              <h4>Period isplativosti</h4>
            </NumberBox>
            <NumberBox>
              {/* <h2>{formatterEur(mesUsteda)}</h2> */}
              <h2>{formatter(mesUsteda)}</h2>
              <h4>Mesečna ušteda</h4>
            </NumberBox>
          </Box>
        )}
      </Wrapper>
    </FormProvider>
  );
};

export default CalcForm;
