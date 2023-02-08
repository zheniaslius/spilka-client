import styled from 'styled-components';

import { device } from '../../constants';

export const LanguageText = styled.a`
  color: ${(props) => props.theme.white};
  position: relative;
  left: 155px;
  top: -27px;
  text-transform: uppercase;

  @media ${device.tablet} {
    left: 10px;
  }
`;
