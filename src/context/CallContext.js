import React, { createContext, useState, useRef, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { QueueContext } from './QueueContext';
import { Peer } from 'peerjs';

const CallContext = createContext();

const socket = io(process.env.REACT_APP_API_ENDPOINT);

const CallContextProvider = ({ children }) => {
  const { abortSpeakerSearch } = useContext(QueueContext);
  const [callPending, setCallPending] = useState(false);
  const [stream, setStream] = useState();
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [userDisconnected, setUserDisconnected] = useState(false);

  const userVideo = useRef();
  const peer = useRef();
  const currentCall = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((currentStream) => {
      setStream(currentStream);
    });

    socket.on('me', (id) => {
      peer.current = new Peer(id, {
        key: "peerjs",
        debug: 2,
        secure: process.env.REACT_APP_ENV === "PRODUCTION",
      });
      setMe(id);
    });

    socket.on('callUser', ({ from }) => {
      setCall({ isReceivingCall: true, from });
    });

    socket.on('disconnect-peer', () => {
      hangUp();
      setUserDisconnected(true);
    });
  }, []);

  useEffect(() => {
    if (callPending) {
      abortSpeakerSearch();
      setUserDisconnected(false);
    }
  }, [callPending, abortSpeakerSearch]);

  const renderAudio = (stream) => (userVideo.current.srcObject = stream);

  const answerCall = () => {
    setCallPending(true);
    socket.emit('answerCall', { to: call.from });

    peer.current.on('call', (call) => {
      call.answer(stream);
      call.on('stream', renderAudio);
      currentCall.current = call;
    });
  };

  const callUser = (id) => {
    socket.emit('callUser', { userToCall: id, from: me });

    socket.on('callAccepted', () => {
      setCallPending(true);
      let call = peer.current.call(id, stream);
      call.on('stream', renderAudio);
      currentCall.current = call;
    });
  };

  const hangUp = () => {
    abortSpeakerSearch();
    socket.off('callAccepted');
    setCall({});
    setCallPending(false);
  };

  const leaveCall = () => {
    hangUp();
    socket.emit('disconnect-peer', currentCall.current.peer);

    currentCall.current.close();
  };

  return (
    <CallContext.Provider
      value={{
        call,
        callPending,
        userVideo,
        me,
        callUser,
        leaveCall,
        hangUp,
        answerCall,
        stream,
        userDisconnected,
        setUserDisconnected,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export { CallContextProvider, CallContext };
