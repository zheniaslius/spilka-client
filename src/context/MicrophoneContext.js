import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { CallContext } from './CallContext';

const MicrophoneContext = createContext();

const MicrophoneContextProvider = ({ children }) => {
  const [muted, setMuted] = useState();
  const { stream } = useContext(CallContext);

  const toggleMute = () => setMuted((prevMuted) => !prevMuted);

  const setMicEnabled = useCallback(
    (isEnabled) => stream && stream.getAudioTracks().forEach((t) => (t.enabled = isEnabled)),
    [stream]
  );

  useEffect(() => {
    if (stream && typeof muted === 'boolean') {
      setMicEnabled(!muted);
    }
  }, [stream, muted, setMicEnabled]);

  useEffect(() => () => setMicEnabled(true), [setMicEnabled]);

  return (
    <MicrophoneContext.Provider
      value={{
        toggleMute,
        muted,
      }}
    >
      {children}
    </MicrophoneContext.Provider>
  );
};

export { MicrophoneContextProvider, MicrophoneContext };
