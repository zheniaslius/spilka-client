import React, { createContext, useState, useRef, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';

import { QueueContext } from './QueueContext';
import { MicrophoneContext } from './MicrophoneContext';

const CallContext = createContext();

const socket = io(process.env.NEXT_PUBLIC_API_ENDPOINT);

const options = {
  key: 'peerjs',
  debug: 2,
  secure: process.env.NEXT_PUBLIC_DB_NAME === 'PRODUCTION',
};

const CallContextProvider = ({ children }) => {
  const { abortSpeakerSearch } = useContext(QueueContext);
  const { setStream, stream, setMuted: setMicroMuted } = useContext(MicrophoneContext);
  const [callPending, setCallPending] = useState(false);
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [userDisconnected, setUserDisconnected] = useState(false);

  const userVideo = useRef();
  const peer = useRef();
  const currentCall = useRef();

  useEffect(() => {
    import('peerjs').then(({ default: Peer }) => {
      socket.on('me', (id) => {
        peer.current = new Peer(id, options);
        setMe(id);
      });

      socket.on('callUser', ({ from }) => {
        setCall({ isReceivingCall: true, from });
      });

      socket.on('disconnect-peer', () => {
        hangUp();
        setUserDisconnected(true);
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (callPending) {
      setUserDisconnected(false);
    }
  }, [callPending, abortSpeakerSearch]);

  const handleMicPermission = () => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((currentStream) => {
      setStream(currentStream);
    });
  };

  const renderAudio = (stream) => (userVideo.current.srcObject = stream);

  const handleCall = (call) => {
    call.on('stream', renderAudio);
    currentCall.current = call;
  };

  const answerCall = () => {
    abortSpeakerSearch();
    setCallPending(true);
    socket.emit('answerCall', { to: call.from });

    peer.current.on('call', (call) => {
      call.answer(stream);
      handleCall(call);
    });
  };

  const callUser = (id) => {
    socket.emit('callUser', { userToCall: id, from: me });

    socket.on('callAccepted', () => {
      setCallPending(true);
      const call = peer.current.call(id, stream);
      handleCall(call);
    });
  };

  // I pressed when searching
  const hangUp = () => {
    abortSpeakerSearch();
    socket.off('callAccepted');
    setCall({});
    setCallPending(false);
    setMicroMuted(false);
  };

  const leaveCall = () => {
    hangUp();
    socket.emit('disconnect-peer', currentCall.current?.peer);

    currentCall.current?.close();
  };

  return (
    <CallContext.Provider
      value={{
        call,
        callPending,
        userVideo,
        me,
        callUser,
        handleMicPermission,
        leaveCall,
        hangUp,
        answerCall,
        userDisconnected,
        setUserDisconnected,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export { CallContextProvider, CallContext };
