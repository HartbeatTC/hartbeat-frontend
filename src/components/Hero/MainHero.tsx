/*
    Copyright 2024 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import LOGO from '../../assets/images/white-logo-hb.png';
const MainHero = ({
  textOne,
  textTwo,
  name,
}: {
  textOne: string;
  textTwo: string;
  name: string;
}) => {
  let CLASS =
    'flex flex-col items-center justify-start sm:flex-row sm:justify-center sm:items-center text-5xl sm:text-6xl font-bold sm:gap-2 py-4 w-full max-w-6xl';
  if (name === 'stronger') {
    CLASS =
      'flex flex-col items-center sm:flex-row sm:justify-start sm:items-center text-4xl sm:text-5xl lg:text-6xl justify-start text-white w-full';
  }
  return (
    <div id='home-hero' className={CLASS}>
      {name === 'main' ? (
        <>
          <h2 className='sm:p-4 tracking-wider sm:w-1/3 flex-1 text-right'>
            {textOne}
          </h2>
          <span className='h-20 w-20 sm:h-40 sm:w-40 sm:max-w-1/3'>
            <img
              src={LOGO}
              alt='Logo for Hartbeat Track Club'
              className='object-contain'
            />
          </span>
          <h2 className={`sm:p-4 tracking-wider sm:w-1/3 flex-1`}>{textTwo}</h2>
        </>
      ) : (
        <>
          <h2 className='sm:mb-4 tracking-widest font-extrabold'>{textOne}</h2>
          <div className='flex items-center justify-center'>
            <span
              className={`${
                name === 'stronger'
                  ? 'h-12 w-12 sm:h-20 sm:w-20 flex items-center justify-center'
                  : 'h-20 w-20 sm:h-32 sm:w-32'
              }`}
            >
              <img
                src={LOGO}
                alt='Logo for Hartbeat Track Club'
                className='object-contain h-12 w-12'
              />
            </span>
            <h2
              className={`sm:mb-4 tracking-widest ${
                name === 'stronger' && 'text-red-700 font-extrabold'
              }`}
            >
              {textTwo}
            </h2>
          </div>
        </>
      )}
    </div>
  );
};

export default MainHero;
