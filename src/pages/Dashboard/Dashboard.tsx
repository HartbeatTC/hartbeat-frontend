/*
    Copyright 2024 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */
import { useState } from 'react';
import { RootState, useAppSelector } from '../../redux/store';
import { capitalizeFullName } from '../../utils/capitalizeFullName';
import axios from 'axios';
import { auth } from '../../firebase';

const Dashboard = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [test, setTest] = useState<string>('');

  const handleAdminClick = async () => {
    try {
      console.log('user', user);
      console.log('user token?', await auth?.currentUser?.getIdToken());
      const tokenId = await auth?.currentUser?.getIdToken();
      const response = await axios.get('http://localhost:8080/auth/signedIn', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      });

      console.log(response);
      setTest(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Personal Dashboard for...</h1>
      <p>{user?.email}</p>
      <p>{capitalizeFullName(user?.displayName || '')}</p>
      <p onClick={handleAdminClick}> Admin? </p>
      <p>{JSON.stringify(test)}</p>
    </div>
  );
};

export default Dashboard;
