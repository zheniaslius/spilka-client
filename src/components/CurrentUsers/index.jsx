import React, { useState, useEffect } from 'react';
import { onSnapshot, query, collection } from 'firebase/firestore';

import { Container, PeopleIcon, Count } from './styles';
import db from '../../config/firebase';

const CurrentUsers = () => {
  const [usersCount, setUsersCount] = useState();

  useEffect(() => {
    const q = query(collection(db, 'sessions'));

    onSnapshot(q, (snapshot) => {
      setUsersCount(snapshot.size);
    });
  }, []);

  return (
    <Container>
      <PeopleIcon />
      <Count>{usersCount}</Count>
    </Container>
  );
};

export default CurrentUsers;
