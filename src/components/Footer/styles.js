import styled from 'styled-components';

import { device } from '../../constants';

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 41px;
  padding: 0 13px;

  @media ${device.laptopHeight} {
    margin-top: 30px;
  }
`;

export const Contact = styled.a`
  display: flex;
`;
