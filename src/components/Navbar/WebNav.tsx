/*
    Copyright 2024 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { Link, NavLink } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { logoutUser } from '../../redux/features/authSlice';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';
const dropdownClass = 'px-4 py-2 hover:bg-gray-100';
import './navbar.style.css';

const WebNav = ({
  user,
  handleLogout,
  handleAuthClick,
  profile,
  handleIconClick,
  navLinks,
}: NavProps) => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  return (
    <ul className='hidden md:flex md:w-full md:justify-center md:items-center md:h-full md:max-w-7xl'>
      {navLinks.map((link, index) => (
        <li
          id='nav-link-desktop'
          key={link.name + index}
          className=' w-full h-full flex flex-1 justify-center items-center nav-link-desktop font-bold hover:text-red-700'
          onClick={() =>
            setActiveLink(activeLink === link.name ? null : link.name)
          }
        >
          <NavLink
            to={link.path}
            className={({ isActive }) => (isActive ? 'text-red-700' : '')}
          >
            {' '}
            {link.name}{' '}
          </NavLink>
          {link.subLinks && (
            <ul className='absolute bg-white shadow-md origin-top nav-ul-desktop w-full flex flex-col items-center justify-center drop-down-ul rounded-lg'>
              {link.subLinks.map((subLink) => (
                <li
                  key={subLink.name}
                  className='nav-link-desktop drop-down-link w-full text-center'
                >
                  <Link to={subLink.path}> {subLink.name} </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
      {user && user.email && (
        <li>
          <Link to='/dashboard'> Dashboard </Link>
        </li>
      )}
      {/* <li className='relative'>
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
      </li> */}
    </ul>
  );
};

export default WebNav;
