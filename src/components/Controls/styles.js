import styled, { css } from 'styled-components';
import { ReactComponent as Call } from '../../assets/images/icons/telephone.svg';
import { ReactComponent as Cancel } from '../../assets/images/icons/cross.svg';
import { ReactComponent as Microphone } from '../../assets/images/icons/microphone.svg';

import { device } from '../../constants';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 0 70px;

  @media ${device.mobileL} {
    padding: 50px 0 60px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 70px;
  margin-left: 104px;
`;

const iconCss = css`
  height: 50px;
  width: 50px;
`;

export const CallIcon = styled(Call)`
  ${(props) => iconCss}
  fill: ${(props) => props.theme.colors.white};
`;

export const CancelIcon = styled(Cancel)`
  ${(props) => iconCss}
  fill: ${(props) => props.theme.colors.white};
`;

export const MicrophoneIcon = styled(Microphone)`
  height: 35px;
  width: 35px;
  opacity: ${(props) => (props.muted ? 1 : 0.25)};
  position: relative;
  cursor: pointer;
  transition: 0.1s ease-in;
  & path {
    fill: ${(props) => props.theme.colors.white};
  }
`;

export const ControlsButton = styled.button`
  background: ${({ theme, cancel }) => (cancel ? theme.colors.red : theme.colors.blue)};
  height: 80px;
  width: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.1s ease-in;
  & svg {
    transform: ${(props) => (props.cancel ? 'rotate(135deg)' : 'none')};
  }
  &:hover {
    filter: brightness(90%);
  }
`;
