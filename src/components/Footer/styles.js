import styled from 'styled-components';

import { device } from '../../constants';
import { ReactComponent as Telegram } from '../../assets/images/icons/telegram.svg';

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

export const TelegramIcon = styled(Telegram)`
  margin-top: -1px;
  margin-left: 5px;
  height: 23px;
  width: 23px;
  fill: ${({ theme }) => theme.colors.white};
`;
