import React, { useContext, useEffect } from 'react';

import { CallContext } from '../../context/CallContext';
import { QueueContext } from '../../context/QueueContext';

const Audio = () => {
  const { me, callPending, userVideo, call, answerCall } = useContext(CallContext);
  const { setId } = useContext(QueueContext);

  useEffect(() => {
    if (call.isReceivingCall) {
      answerCall();
      playAlertSound();
    }
  }, [call.isReceivingCall, answerCall]);

  const playAlertSound = () => {
    
  }

  useEffect(() => {
    me && setId(me);
  }, [me, setId]);

  return <div>{callPending && <audio ref={userVideo} autoPlay />}</div>;
};

export default Audio;
