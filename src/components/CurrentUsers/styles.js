import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.9;
`;

export const Count = styled.span`
  color: ${({ theme }) => theme.colors.white};
`;
