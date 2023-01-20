import React, { useContext } from 'react';
import { MoonLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';

import { CallContext } from '../../context/CallContext';
import { QueueContext } from '../../context/QueueContext';
import { MicrophoneContext } from '../../context/MicrophoneContext';
import {
  Pulse,
  Outline,
  Container,
  UserLogo,
  GuideText,
  SearchContainer,
  DisconnectedLogo,
  ErrorContainer,
  WarningMsg,
} from './styles';

const Main = () => {
  const { callPending, userDisconnected } = useContext(CallContext);
  const { loading } = useContext(QueueContext);
  const { muted } = useContext(MicrophoneContext);
  const { t } = useTranslation();

  const getScreen = (t) => {
    if (callPending) {
      return (
        <Pulse>
          <Outline />
          <Outline delayed />
          <UserLogo />
          <WarningMsg>{muted && t('micMuted')}</WarningMsg>
        </Pulse>
      );
    }
    if (userDisconnected) {
      return <DisconnectedText t={t} />;
    }
    return <InitialText loading={loading} t={t} />;
  };

  return <Container>{getScreen(t)}</Container>;
};

const InitialText = ({ loading, t }) => {
  return loading ? (
    <SearchContainer>
      <GuideText mb="70px">{t('searching')}</GuideText>
      <MoonLoader loading={loading} color="#ffffff" speedMultiplier={0.6} />
    </SearchContainer>
  ) : (
    <GuideText>
      {t('hello')} 👋 <br />
      {t('thisIs')} <br />
      {t('toStart')} <br />
      {t('notRecored')}.{' '}
      <a href="https://bloggeek.me/is-webrtc-safe/" target="_blank" rel="noreferrer">
        {t('learn')}
      </a>
    </GuideText>
  );
};

const DisconnectedText = ({ t }) => {
  return (
    <ErrorContainer>
      <GuideText mb="70px">
        {t('userDisconnected')} <br />
        {t('startNewSearch')}
      </GuideText>
      <DisconnectedLogo />
    </ErrorContainer>
  );
};

export default Main;
