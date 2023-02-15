import styled from 'styled-components';

import { device } from '../../constants';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 0 70px;
  position: relative;

  @media ${device.laptopHeight} {
    padding: 50px 0 60px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 70px;
  margin-left: 104px;
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
  &:disabled {
    background: ${({ theme }) => theme.colors.grey};
    &:hover {
      filter: none;
    }
  }
`;
