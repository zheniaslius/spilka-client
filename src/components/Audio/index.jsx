import React, { useContext, useEffect } from 'react';
import ReactGA from 'react-ga4';
import useSound from 'use-sound';

import { CallContext } from '../../context/CallContext';
import { QueueContext } from '../../context/QueueContext';

import notifSfx from '../../public/sounds/notifications-sound-127856_6LGXAENB.mp3';

const Audio = () => {
  const { me, callPending, userVideo, call, answerCall } = useContext(CallContext);
  const [playSound] = useSound(notifSfx);
  const { setId } = useContext(QueueContext);

  useEffect(() => {
    if (call.isReceivingCall) {
      ReactGA.event({
        category: 'App',
        action: 'Answered call',
      });
      
      answerCall();
      playSound();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call.isReceivingCall]);

  useEffect(() => {
    me && setId(me);
  }, [me, setId]);

  return <div>{callPending && <audio ref={userVideo} autoPlay />}</div>;
};

export default Audio;
