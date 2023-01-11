import React, { createContext, useState, useRef, useEffect, useContext, useCallback } from 'react';
import { io } from 'socket.io-client';
import { QueueContext } from './QueueContext';

const CallContext = createContext();

const socket = io(process.env.REACT_APP_API_ENDPOINT);
const config = {
  iceServers: [
    {
      url: 'stun:global.stun.twilio.com:3478?transport=udp',
      urls: 'stun:global.stun.twilio.com:3478?transport=udp'
    },
    {
      url: 'turn:global.turn.twilio.com:3478?transport=udp',
      username: '32f1fb6bc2aae2b239899ca55612c4067b15627d01bf762bfb5eb03083b87a64',
      credential: 'Gq2PZPmVj6ME7hIRVkTA7Pak0Teq77rVbwY+rW6ojmc='
    },
  ],
};

const CallContextProvider = ({ children }) => {
  const { abortSpeakerSearch } = useContext(QueueContext);
  const [callPending, setCallPending] = useState(false);
  const [stream, setStream] = useState();
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [userDisconnected, setUserDisconnected] = useState(false);

  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((currentStream) => {
      setStream(currentStream);
    });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, signal }) => {
      setCall({ isReceivingCall: true, from, signal });
    });
  }, []);

  useEffect(() => {
    if (callPending) {
      abortSpeakerSearch();
      setUserDisconnected(false);
    }
  }, [callPending, abortSpeakerSearch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePeer = (peer) => {
    peer.on('stream', (currentStream) => {
      userVideo.current && (userVideo.current.srcObject = currentStream);
      console.log('on stream', currentStream);
    });
    peer.on('error', () => leaveCall(true));
    peer.on('close', () => leaveCall());

    connectionRef.current = peer;
  };

  const answerCall = useCallback(() => {
    setCallPending(true);

    const peer = new window.SimplePeer({ initiator: false, trickle: false, stream, config });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.signal(call.signal);

    handlePeer(peer);
  }, [call.from, call.signal, stream, handlePeer]);

  const callUser = (id) => {
    const peer = new window.SimplePeer({ initiator: true, trickle: false, stream, config });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me });
    });

    socket.on('callAccepted', (signal) => {
      setCallPending(true);
      peer.signal(signal);
    });

    handlePeer(peer);
  };

  const hangUp = () => {
    setCall({});
    socket.off('callAccepted');
    abortSpeakerSearch();
    setCallPending(false);
  };

  const leaveCall = (isError) => {
    hangUp();
    isError && setUserDisconnected(true);

    connectionRef.current?.destroy();
    connectionRef.current = null;
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
