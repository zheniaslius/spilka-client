import React from 'react';
import styled from 'styled-components';

import Main from './components/Main';
import Audio from './components/Audio';
import Controls from './components/Controls';
import CurrentUsers from './components/CurrentUsers';
import Header from './components/Header';

const Wrapper = styled.div`
  margin: 150px auto 200px;
  max-width: 640px;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.darkBlue};
  border-radius: 20px;
  box-shadow: 0px 5px 14px -1px rgb(2 3 12 / 37%);
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 28px;
  padding: 0 15px;
`;

const App = () => {
  return (
    <Wrapper>
      <Header />
      <Container>
        <Main />
        <Audio />
        <Controls />
      </Container>
      <Footer>
        <CurrentUsers />
      </Footer>
    </Wrapper>
  );
};

export default App;
