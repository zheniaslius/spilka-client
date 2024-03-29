import styled from 'styled-components';

import { device } from '../../constants';

export const LanguageText = styled.a`
  color: ${(props) => props.theme.white};
  position: relative;
  left: 155px;
  top: -27px;
  text-transform: uppercase;
  cursor: pointer;

  @media ${device.tablet} {
    left: 10px;
  }
  
  @media ${device.laptopHeight} {
    left: 10px;
  }
`;
