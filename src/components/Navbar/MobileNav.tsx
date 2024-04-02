/*
    Copyright 2024 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const MobileNav = ({
  user,
  handleLogout,
  handleAuthClick,
  profile,
  handleIconClick,
  navLinks,
}: NavProps) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const [clickedNavItem, setClickedNavItem] = useState<null | number>(null);

  // Disable scrolling on the body when the navbar is open
  useEffect(() => {
    if (isNavbarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isNavbarOpen]);

  const handleClickHamburger = () => {
    setIsNavbarOpen(!isNavbarOpen);
    setClickedNavItem(null);
  };
  const handleLinkClick = (index: number) => {
    setClickedNavItem(index);
    setIsNavbarOpen(false);
  };
  return (
    <>
      <div className='md:hidden px-14 z-50 w-full flex justify-end'>
        <div onClick={handleClickHamburger} className='cursor-pointer'>
          {isNavbarOpen ? (
            <AiOutlineClose size={40} />
          ) : (
            <AiOutlineMenu size={40} />
          )}
        </div>
      </div>
      {isNavbarOpen && (
        <ul className='fixed inset-0 bg-white z-40 flex flex-col items-center justify-start pt-40 text-3xl gap-8 space-y-6 overflow-y-auto'>
          {navLinks.map((link, index) => (
            <li
              key={link.name + index}
              onClick={handleLinkClick.bind(null, index)}
              className='w-full text-center font-bold hover:text-red-700'
            >
              {link.subLinks && clickedNavItem === index && (
                <ul className='flex flex-col items-center justify-center gap-2'>
                  {link.subLinks.map((subLink) => (
                    <li key={subLink.name} className='w-full text-center'>
                      <NavLink to={subLink.path}>{subLink.name}</NavLink>
                    </li>
                  ))}
                </ul>
              )}
              <NavLink to={link.path} className='w-full'>
                {link.name}
              </NavLink>
            </li>
          ))}
          {user && user.email && (
            <li className='w-full text-center font-bold hover:text-red-700'>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default MobileNav;
