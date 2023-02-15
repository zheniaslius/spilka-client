import styled from 'styled-components';
import { device } from '../../constants';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 30px;

  @media ${device.laptopHeight} {
    margin-bottom: 15px;
  }
`;

export const AppName = styled.h1`
  font-weight: 600;
  background-color: #628cf6;
  font-size: 80px;
  position: relative;
  letter-spacing: 1.4px;
  background-image: linear-gradient(to right bottom, #628cf6, #6683f8, #6d79f9, #766ff8, #8262f6);
  background-size: 100%;
  background-repeat: repeat;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;

  @media ${device.laptopHeight} {
    font-size: 60px;
  }
`;
