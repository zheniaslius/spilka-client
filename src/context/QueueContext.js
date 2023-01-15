import React, { useState, useRef, createContext, useEffect, useCallback } from 'react';
import { addDoc, collection, query, where, getDocs, doc, limit, updateDoc } from 'firebase/firestore';

import db from '../config/firebase';

const dbName = process.env.REACT_APP_DB_NAME;
const colRef = collection(db, dbName);

const REFETCH_DELAY = 1000;

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

  const updateDocument = async (data) => {
    if (!id) return;

    try {
      const querySnapshot = await getDocs(query(colRef, where('sessionId', '==', id), limit(1)));
      const docId = querySnapshot.docs[0].id;
      const docRef = doc(db, dbName, docId);
      return updateDoc(docRef, data);
    } catch (error) {
      console.error('Setting status error', error);
    }
  };

  const abortSpeakerSearch = () => {
    clearInterval(inerval.current);
    updateDocument({ inSearch: false });
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
      }, REFETCH_DELAY);
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
        updateDocument,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export { QueueContextProvider, QueueContext };
