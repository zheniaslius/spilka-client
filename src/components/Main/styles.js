import styled, { keyframes } from 'styled-components';
import { ReactComponent as User } from '../../assets/images/icons/user.svg';
import { ReactComponent as Disconnected } from '../../assets/images/icons/disconnect.svg';

export const Container = styled.div`
  height: 310px;
  padding-top: 169px;
  display: flex;
  justify-content: center;
`;

export const GuideText = styled.span`
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  font-size: 19px;
  margin-bottom: ${({ mb }) => (mb ? mb : '0')};
  line-height: 1.8;
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
