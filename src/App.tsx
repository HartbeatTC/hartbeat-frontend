/*
    Copyright 2023 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from './AppRoutes.js';
import { Navbar, AppRoutesContainer } from './components';
import { useEffect } from 'react';
import { fetchUser, login } from './redux/features/authSlice.js';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from './redux/store/index.ts';
import { auth } from './firebase/index.ts';

console.log('env', import.meta.env.VITE_FIREBASE_KEY);

function App() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state: RootState) => state.auth);

  console.log({ user });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.email)
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user?.photoURL || null,
            displayName: user.displayName || null,
          })
        );
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <AppRoutesContainer>
        <AppRoutes />
      </AppRoutesContainer>
      <footer> FOOTER </footer>
    </div>
  );
}

export default App;
