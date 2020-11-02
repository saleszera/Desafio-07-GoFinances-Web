import styled from 'styled-components';
import { shade, lighten } from 'polished';

interface ButtonProps {
  buttonStatus?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 736px;
  margin: 0 auto;
  padding: 30px 20px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #fff;
  margin-top: -150px;
  border-radius: 5px;
  padding: 34px;

  h1 {
    font-weight: 500;
    font-size: 36px;
    line-height: 54px;
    color: #363f5f;
    text-align: center;
    margin-bottom: 16px;
  }

  input {
    border: 1px solid #969cb3;
    border-radius: 4px;
    width: 327px;
    height: 50px;
    padding: 0 24px;

    color: #363f5f;

    & + input {
      margin-top: 16px;
    }
  }
`;

export const TypeContainer = styled.div`
  display: flex;

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    background: #f0f2f5;
    border: none;
    border-radius: 4px;

    height: 50px;
    width: 160px;
    margin: 16px 8px;
  }

  .active {
    background: ${lighten(0.4, '#5636d3')};
  }
`;

export const Footer = styled.section<ButtonProps>`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  p {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 18px;
    color: #969cb3;

    margin-bottom: 36px;

    img {
      margin-right: 5px;
    }
  }

  button {
    background: #ff872c;
    color: #fff;
    border-radius: 5px;
    padding: 15px 80px;
    border: 0;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#ff872c')};
    }
  }
`;
