/*
    Copyright 2024 Hartbeat Track Club. All rights reserved.
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
import { useEffect, useState } from 'react';
import WebNav from './WebNav';
import { User } from '../../interfaces/User';
import { navLinks } from '../../constants/navlinks';

const dropdownClass = 'px-4 py-2 hover:bg-gray-100';

const Navbar = () => {
  /* --- USE STATE --- */
  const [profile, setProfile] = useState<boolean>(false);
  const [scrollTop, setScrollTop] = useState<number>();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  /* --- USE SELECTOR FROM STORE/STATE --- */
  const { user } = useAppSelector((state: RootState) => state.auth);

  /* --- USE DISPATCH --- */
  const dispatch = useAppDispatch();

  const handleScroll = () => {
    setScrollTop(window.scrollY);
  };

  /* --- ALL FUNCTIONS --- */
  const updateIsMobile = () => {
    setIsMobile(window.innerWidth < 1280);
  };

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

  /* --- END ALL FUNCTION --- */

  /* --- USE EFFECTS --- */
  // Add a resize event listener to update isMobile when the screen size changes
  useEffect(() => {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    // add event listener for scroll event on mount
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateIsMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // create a useEffect where if the user refreshed the page when scroll Y is past 40 then setScroll to that position
  useEffect(() => {
    if (window.scrollY > 40) {
      setScrollTop(window.scrollY);
    }
  }, []);

  /* --- END USE EFFECTS --- */

  const NAV_LINKS = navLinks();
  return (
    <nav className='flex w-full justify-center items-center mx-auto h-24 bg-slate-200'>
      <WebNav
        user={user as User}
        handleLogout={handleLogout}
        handleAuthClick={handleAuthClick}
        profile={profile}
        handleIconClick={handleIconClick}
        navLinks={NAV_LINKS}
      />
    </nav>
  );
};

export default Navbar;
