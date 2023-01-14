import styled from 'styled-components';
import { ReactComponent as Users } from '../../assets/images/icons/users.svg';

export const Container = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.9;
`;

export const PeopleIcon = styled(Users)`
  top: -1px;
  position: relative;
  height: 25px;
  width: 25px;
  fill: ${({ theme }) => theme.colors.white};
  margin-right: 7px;
`;

export const Count = styled.span`
  color: ${({ theme }) => theme.colors.white};
`;
