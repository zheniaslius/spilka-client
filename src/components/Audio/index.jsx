import React, { useContext, useEffect } from 'react';

import { CallContext } from '../../context/CallContext';
import { QueueContext } from '../../context/QueueContext';

const Audio = () => {
  const { me, callPending, userVideo, call, answerCall } = useContext(CallContext);
  const { setId } = useContext(QueueContext);

  useEffect(() => {
    if (call.isReceivingCall) {
      answerCall();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call.isReceivingCall]);

  useEffect(() => {
    me && setId(me);
  }, [me, setId]);

  return <div>{callPending && <audio ref={userVideo} autoPlay />}</div>;
};

export default Audio;
