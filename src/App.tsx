/*
    Copyright 2023 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { useEffect } from 'react';
import AppRoutes from './AppRoutes.js';
import { Navbar, AppRoutesContainer } from './components';
import { checkAuthState } from './redux/features/authSlice.ts';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from './redux/store/index.ts';

function App() {
  const dispatch = useAppDispatch();

  const { user, isLoading } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(checkAuthState());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
