import React, { createContext, useState, useEffect, useCallback } from 'react';

const MicrophoneContext = createContext();

const MicrophoneContextProvider = ({ children }) => {
  const [stream, setStream] = useState();
  const [muted, setMuted] = useState();
  console.log({muted})

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
        setMuted,
        muted,
        setStream,
        stream,
      }}
    >
      {children}
    </MicrophoneContext.Provider>
  );
};

export { MicrophoneContextProvider, MicrophoneContext };
