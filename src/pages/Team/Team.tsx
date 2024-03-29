/*
    Copyright 2024 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { ImageCarousel } from '../../components';
import { EmblaOptionsType } from 'embla-carousel';
import { navLinks } from '../../contants/navlinks';
import { Link } from 'react-router-dom';
const images = [
  'https://source.unsplash.com/featured/?track',
  'https://source.unsplash.com/featured/?running',
  'https://source.unsplash.com/featured/?competition',
  'https://source.unsplash.com/featured/?cycling',
  'https://source.unsplash.com/featured?hiking',
  'https://source.unsplash.com/featured?swimming',
  'https://source.unsplash.com/featured?rowing',
  'https://source.unsplash.com/featured?climbing',
  'https://source.unsplash.com/featured?track',
  'https://source.unsplash.com/featured?boxing',
  'https://source.unsplash.com/featured?hiking',
];

const OPTIONS: EmblaOptionsType = { align: 'start', loop: true };
const SLIDE_COUNT = 6;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
const Team = () => {
  const allNavLinks = navLinks();
  const teamLink = allNavLinks.find((link) => link.name === 'Team');
  const teamSubLinks = teamLink && teamLink.subLinks ? teamLink.subLinks : [];
  return (
    <div className='w-full bg-slate-100'>
      <ImageCarousel slides={images} options={OPTIONS} />
      <div className='flex flex-col gap-4 w-full items-center'>
        <h1 className='text-6xl tracking-widest font-bold'>Meet the Team</h1>
        <ul className='flex w-full justify-center items-start gap-4'>
          {teamSubLinks.map((link, i) => (
            <li
              key={i}
              className='w-46 bg-slate-300 rounded-3xl p-3 hover:opacity-50 '
            >
              <Link to={link.path} className='p-4'>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className='flex flex-col w-full justify-center items-center'>
          <h2>CURRENT ROSTER</h2>
          <p>
            <em>* Masters Athlete</em>
          </p>
          <table className='w-full max-w-7xl mx-auto'>
            <thead>
              <tr>
                <th>Men</th>
                <th>Non-Binary</th>
                <th>Women</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(Array(15).keys()).map((_, i) => (
                <tr key={i} className=''>
                  <td className='p-2 text-center'>John Doe {i}</td>
                  <td className='p-2 text-center'>Jane Doe {i}</td>
                  <td className='p-2 text-center'>John Doe {i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Team;
