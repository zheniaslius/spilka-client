import React, { useContext } from 'react';
import { MicrophoneContext } from '../../context/MicrophoneContext';
import { MicrophoneIcon } from './styles';

const Microphone = () => {
  const { toggleMute, muted } = useContext(MicrophoneContext);

  return <MicrophoneIcon onClick={toggleMute} muted={muted} />;
};

export default Microphone;
