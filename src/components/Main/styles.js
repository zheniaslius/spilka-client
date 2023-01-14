import styled, { keyframes } from 'styled-components';
import { ReactComponent as User } from '../../assets/images/icons/user.svg';
import { ReactComponent as Disconnected } from '../../assets/images/icons/disconnect.svg';
import { device } from '../../constants';

export const Container = styled.div`
  height: 310px;
  padding: 169px 0 0;
  display: flex;
  justify-content: center;

  @media ${device.tablet} {
    height: 200px;
    padding: 118px 12px 0;
  }

  @media ${device.laptopHeight} {
    height: 184px;
    padding: 100px 12px 0;
  }
`;

export const GuideText = styled.span`
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  font-size: 19px;
  margin-bottom: ${({ mb }) => (mb ? mb : '0')};
  line-height: 1.8;

  @media ${device.tablet} {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 38px;
  }
`;

export const UserLogo = styled(User)`
  fill: ${(props) => props.theme.colors.black};
  height: 140px;
  width: 140px;
`;

export const DisconnectedLogo = styled(Disconnected)`
  & path,
  & circle {
    fill: #ffffff45;
  }
  height: 140px;
  width: 140px;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const pulse = (props) => keyframes`
  50% {
    transform: scale(1.1);
    border: solid ${props.theme.colors.blue};
    opacity: 0.5;
  }

  100% {
    transform: scale(1.5);
    opacity: 0.2;
    border: 3px solid ${props.theme.colors.darkBlue};
  }
`;

export const Pulse = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  margin-top: -80px;
  position: relative;
`;

export const Outline = styled.div`
  width: 180px;
  height: 180px;
  animation: ${pulse} 3s;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
  position: absolute;

  border-radius: 50%;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WarningMsg = styled.span`
  position: absolute;
  color: ${(props) => props.theme.colors.red};
  bottom: 0;
  white-space: nowrap;
`;