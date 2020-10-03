/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';

const InputContainer = styled.div`
  position: relative;
  width: ${p => (p.contact ? `100%` : `10em`)};
  height: ${p => (p.contact ? `unset` : `2.4em`)};
  display: flex;
  flex-direction: column;
  margin-bottom: ${p => (p.contact ? `2.5em` : 0)};

  input {
    text-align: ${p => (p.contact ? `unset` : `center`)};
    padding: ${p => (p.contact ? `1em 2em 1em 1.5em` : `0.5em 1em`)};
    outline: none;
    appearance: none;
    font-size: 1em;
    line-height: 1.4;
    background-color: ${p => p.theme.colors.gray};
    border-radius: 0.5em;
    transition: all 0.2s ease-in-out;

    &::placeholder {
      color: ${p => p.theme.colors.grayDark};
      opacity: 0.5;
      font-weight: bold;
      text-align: end;
    }

    &:hover,
    &:focus {
      box-shadow: 0 0 0 2px ${p => p.theme.colors.pink};
    }

    &:disabled {
      background-color: ${p => p.theme.colors.disabledInput};
      border-color: ${p => p.theme.colors.disabledInput};
      cursor: not-allowed;
    }
  }
`;

const Input = ({
  type = '',
  name,
  placeholder = '',
  autoComplete = 'off',
  required = false,
  disabled = false,
}) => {
  const { register, errors } = useFormContext();

  return (
    <InputContainer error={errors[name]}>
      <label hidden htmlFor={name}>
        {name}
      </label>
      <input
        id={name}
        aria-label={name}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        ref={register({ required })}
      />
    </InputContainer>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;
