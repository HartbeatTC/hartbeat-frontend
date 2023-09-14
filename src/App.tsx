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
import { fetchUser } from './redux/features/authSlice.js';
import { RootState } from './redux/store/index.js';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser() as any);
    }
  }, [dispatch, user]);

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
