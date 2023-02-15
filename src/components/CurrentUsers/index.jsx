import React, { useState, useEffect } from 'react';
import { onSnapshot, query, collection } from 'firebase/firestore';

import { Container, Count } from './styles';
import UsersIcon from '../../components/Icons/UsersIcon';
import db from '../../../firebaseConfig';

const CurrentUsers = () => {
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const q = query(collection(db, process.env.NEXT_PUBLIC_DB_NAME));

    onSnapshot(q, (snapshot) => {
      setUsersCount(snapshot.size);
    });
  }, []);

  return (
    <Container>
      <UsersIcon />
      <Count>Online: {usersCount}</Count>
    </Container>
  );
};

export default CurrentUsers;
