/*
    Copyright 2023 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { Routes, Route } from 'react-router-dom';
import { AuthForm, PageNotFound } from './components';
import { Home } from './pages';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='/login'
        element={<AuthForm name='login' capName='Login' />}
      />
      <Route
        path='/signup'
        element={<AuthForm name='signup' capName='Sign Up' />}
      />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
