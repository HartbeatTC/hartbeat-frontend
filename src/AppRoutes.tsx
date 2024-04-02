/*
    Copyright 2024 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { Routes, Route } from 'react-router-dom';
import { AuthForm, PageNotFound } from './components';
import { Dashboard, Home, Results, Schedule, Team } from './pages';
import { RootState, useAppSelector } from './redux/store';
import ProtectedRoutes from './ProtectedRoutes';
import AthleteList from './pages/Team/AthleteList';

const AppRoutes = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      {/* {!user && (
        <>
          <Route
            path='/login'
            element={<AuthForm name='login' capName='Login' />}
          />
          <Route
            path='/signup'
            element={<AuthForm name='signup' capName='Sign Up' />}
          />
        </>
      )} */}
      <Route path='/results' element={<Results />} />
      <Route path='/schedule' element={<Schedule />} />
      <Route path='/team' element={<Team />} />
      <Route path='/team/men' element={<AthleteList category='male' />} />
      <Route path='/team/women' element={<AthleteList category='female' />} />
      <Route
        path='/team/non-binary'
        element={<AthleteList category='non-binary' />}
      />
      <Route
        path='/team/masters'
        element={<AthleteList category='masters' />}
      />
      {/* Protected Routes when user is logged in and authenticated */}
      <Route element={<ProtectedRoutes />}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
