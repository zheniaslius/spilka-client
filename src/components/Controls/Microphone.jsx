import React, { useEffect, useState, useCallback } from 'react';
import { MicrophoneIcon } from './styles';

const Microphone = ({ stream }) => {
  const [muted, setMuted] = useState();

  const toggleMute = () => setMuted((prevMuted) => !prevMuted);

  const setMicEnabled = useCallback((isEnabled) => stream && stream.getAudioTracks().forEach((t) => (t.enabled = isEnabled)), [stream]);

  useEffect(() => {
    if (stream && typeof muted === 'boolean') {
      setMicEnabled(!muted)
    }
  }, [stream, muted, setMicEnabled]);

  useEffect(() => () => setMicEnabled(true), [setMicEnabled])

  return <MicrophoneIcon onClick={toggleMute} muted={muted} />;
};

export default Microphone;
