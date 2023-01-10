import React, { useState, useRef, createContext, useEffect, useCallback } from 'react';
import { addDoc, collection, query, where, getDocs, doc, limit, updateDoc } from 'firebase/firestore';

import db from '../config/firebase';

const colRef = collection(db, 'sessions');

const QueueContext = createContext();

const QueueContextProvider = ({ children }) => {
  const [id, setId] = useState();
  const [loading, setLoading] = useState(false);
  const inerval = useRef(null);

  const addToQueue = useCallback(() => {
    if (!id) return;

    try {
      addDoc(colRef, {
        sessionId: id,
        inSearch: false,
      });
    } catch (error) {
      console.error('Error with adding to queue', error);
    }
  }, [id]);

  useEffect(() => {
    id && addToQueue();
  }, [id, addToQueue]);

  const setSearchStatus = async (inSearch) => {
    let promise;
    try {
      const querySnapshot = await getDocs(query(colRef, where('sessionId', '==', id), limit(1)));
      const docId = querySnapshot.docs[0].id;
      const docRef = doc(db, 'sessions', docId);
      promise = updateDoc(docRef, { inSearch });
    } catch (error) {
      console.error('Setting status error', error);
    }
    return promise;
  };

  const abortSpeakerSearch = () => {
    clearInterval(inerval.current);
    setSearchStatus(false);
    setLoading(false);
  };

  const findSpeaker = () => {
    if (!id) return;

    setLoading(true);
    return new Promise((resolve, reject) => {
      inerval.current = setInterval(async () => {
        try {
          const querySnapshot = await getDocs(
            query(colRef, where('sessionId', '!=', id), where('inSearch', '==', true), limit(1))
          );

          const { sessionId } = querySnapshot.docs.map((doc) => doc.data())?.[0] || {};

          if (sessionId) {
            abortSpeakerSearch();
            resolve(sessionId);
            setLoading(false);
          }
        } catch (error) {
          console.error('Error with finding speaker');
          reject(error);
        }
      }, 1000);
    });
  };

  return (
    <QueueContext.Provider
      value={{
        addToQueue,
        findSpeaker,
        loading,
        abortSpeakerSearch,
        setId,
        setSearchStatus,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export { QueueContextProvider, QueueContext };
