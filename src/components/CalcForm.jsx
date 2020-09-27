import React from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
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
  }
`;

const validationSchema = yup.object().shape({
  kvadratura: yup.number().min(1).required('Kvadratura is required!'),
  visina: yup.number().min(1).required('Visina is required!'),
  lux: yup.number().min(1).required('Lux is required!'),
});

const CalcForm = () => {
  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = data => {};

  return (
    <FormProvider {...methods}>
      <Wrapper onSubmit={handleSubmit(onSubmit)} id="calc-form">
        <Box top>
          <BoxLeft>
            <InputBox>
              <p>Cena struje</p>
              <Input type="number" name="cena-struje" required />
            </InputBox>
          </BoxLeft>
          <BoxRight>
            <InputBox>
              <p>Radni sati</p>
              <Input type="number" name="radni-sati" required />
            </InputBox>
          </BoxRight>
        </Box>
        <Title>Rasveta</Title>
        <Box bottom>
          <BoxLeft>
            <BoxTitle>Trenutna</BoxTitle>
            <InputBox>
              <p>Broj sijalica</p>
              <Input type="number" name="broj-sijalica" required />
            </InputBox>
            <InputBox>
              <p>Vati po sijalici</p>
              <Input type="number" name="snaga-sijalice" required />
            </InputBox>
            <InputBox>
              <p>Cena po sijalici</p>
              <Input type="number" name="cena-sijalice" required />
            </InputBox>
            <CostBox left>
              <CostLabel>Inicijalni troškovi</CostLabel>
              <Cost>300,20</Cost>
            </CostBox>
            <CostBox left>
              <CostLabel>Godišnji troškovi</CostLabel>
              <Cost>300,20</Cost>
            </CostBox>
          </BoxLeft>
          <BoxRight>
            <BoxTitle>Preporučena</BoxTitle>
            <InputBox>
              <p>Broj sijalica</p>
              <Input type="number" name="broj-sijalica" required />
            </InputBox>
            <InputBox>
              <p>Vati po sijalici</p>
              <Input type="number" name="snaga-sijalice" required />
            </InputBox>
            <InputBox>
              <p>Cena po sijalici</p>
              <Input type="number" name="cena-sijalice" required />
            </InputBox>
            <CostBox>
              <CostLabel>Inicijalni troškovi</CostLabel>
              <Cost>300,20</Cost>
            </CostBox>
            <CostBox>
              <CostLabel>Godišnji troškovi</CostLabel>
              <Cost>300,20</Cost>
            </CostBox>
          </BoxRight>
        </Box>
        <Box>
          <NumberBox>
            <h2>$10</h2>
            <h4>Godišnja ušteda</h4>
          </NumberBox>
          <NumberBox>
            <h2>1.5 Godina</h2>
            <h4>Period isplativosti</h4>
          </NumberBox>
          <NumberBox>
            <h2>$5</h2>
            <h4>Mesečna razlika</h4>
          </NumberBox>
        </Box>
      </Wrapper>
    </FormProvider>
  );
};

export default CalcForm;
