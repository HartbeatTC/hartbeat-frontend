/*
    Copyright 2023 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { Link } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { logoutUser } from '../../redux/features/authSlice';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';

const dropdownClass = 'px-4 py-2 hover:bg-gray-100';

const Navbar = () => {
  const [profile, setProfile] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    // await signOut(auth);
    setProfile(!profile);
    dispatch(logoutUser());
  };

  const handleAuthClick = () => {
    setProfile(!profile);
  };

  const handleIconClick = () => {
    setProfile(!profile);
  };

  return (
    <nav className='flex w-full justify-center items-center max-w-7xl mx-auto'>
      <ul className='flex gap-6 w-full justify-evenly items-center'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/team'>Team</Link>
        </li>
        <li>
          <Link to='/schedule'>Schedule</Link>
        </li>
        <li>
          <Link to='/results'>Results</Link>
        </li>
        {user && user.email && (
          <li>
            {' '}
            <Link to='/dashboard'> Dashboard </Link>
          </li>
        )}
        <li className='relative'>
          <CgProfile
            size={30}
            onClick={handleIconClick}
            className='cursor-pointer'
          />
          <ul
            className={`${
              profile ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
            } w-44 transform transition-transform duration-300 ease-in-out absolute left-0 mt-8 space-y-2 bg-white border rounded shadow-md origin-top`}
          >
            {user && user.email ? (
              <li className={dropdownClass}>
                <p onClick={handleLogout} className='hover:cursor-pointer'>
                  {' '}
                  Logout
                </p>
              </li>
            ) : (
              <>
                <li className={dropdownClass}>
                  <Link onClick={handleAuthClick} to='/login'>
                    Login
                  </Link>
                </li>
                <li className={dropdownClass}>
                  <Link onClick={handleAuthClick} to='/signup'>
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
