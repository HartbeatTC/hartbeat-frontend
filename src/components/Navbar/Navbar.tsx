/*
    Copyright 2023 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { Link } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { logout } from '../../redux/features/authSlice';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  return (
    <nav className='flex w-full justify-center items-center'>
      <ul className='flex gap-6 w-full justify-between items-center'>
        <li>Home</li>
        <li>Team</li>
        <li>Schedule</li>
        <li>Results</li>
        {user && user.email ? (
          <li>
            <p onClick={handleLogout} className='hover:cursor-pointer'>
              {' '}
              Logout
            </p>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Sign up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
