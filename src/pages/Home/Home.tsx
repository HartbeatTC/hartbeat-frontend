/*
    Copyright 2024 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { Link } from 'react-router-dom';
import HOME_VID from '../../assets/video/home_video.mp4';
import { MainHero } from '../../components';
import { FOOTER } from '../../contants/footer';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import PRIZZI_HOME from '../../assets/images/home/prizzi_home.webp';
import KEV_HOME from '../../assets/images/home/kev_home.webp';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const Home = () => {
  const { LOGOS } = FOOTER;
  return (
    <>
      <div className='h-[70vh] w-full sm:px-4 relative'>
        <div className='relative h-full'>
          <video
            src={HOME_VID}
            preload='auto'
            autoPlay
            loop
            muted
            playsInline
            className='object-cover w-full h-full object-top sm:rounded-lg '
          ></video>
          <div
            id='video-overlay'
            className='absolute top-0 left-0 bottom-0 right-0 w-full flex flex-col justify-end items-center bg-black bg-opacity-50 sm:rounded-lg'
          >
            <div className='relative top-0 left-0 p-4'>
              <MainHero textOne='Stronger' textTwo='Together' name='stronger' />
            </div>
            <div className='bg-black text-white bg-opacity-50 p-2 sm:px-8 py-4'>
              <h2 className='text-2xl font-extrabold py-2'>ABOUT US</h2>
              <p className='text-sm sm:text-lg'>
                Founded in 2018, Hartbeat Track Club is a competitive
                Connecticut racing team. Our purpose is to provide a friendly
                and flexible team environment for post-collegiates in the
                Greater Hartford area to continue chasing their running dreams
                while also pursuing their professional careers.
              </p>

              <Link
                to='/team'
                className='group hover:text-red-700 transition-all duration-300 ease-in-out flex justify-end items-center'
              >
                Meet the Team
                <MdKeyboardDoubleArrowRight className='text-2xl transition-transform duration-300 ease-in-out group-hover:translate-x-1' />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className='px-4 flex flex-col gap-4'>
        <div>YOUTUBE VIDEO SECTION</div>
        <div>RECENT RACE RESULTS</div>
        <div id='join-us-card' className='w-full relative'>
          <div className='relative h-full sm:max-h-96'>
            <img
              src={PRIZZI_HOME}
              alt='image of runner with text saying join us'
              className='rounded-lg object-cover max-h-96 w-full'
              draggable='false'
            />
            <div className='absolute top-0 left-0 bottom-0 right-0 w-full flex flex-col justify-center items-end bg-black bg-opacity-10 sm:rounded-lg pr-8'>
              <div className=' text-white p-2 sm:px-8 py-4 text-sm sm:text-xl flex flex-col gap-2 h-full font-semibold'>
                <h2 className='text-2xl font-extrabold py-2'>JOIN US.</h2>
                <p>📧 Email</p>
                <a type='email' href='mailto:hartbeattc@gmail.com'>
                  {' '}
                  hartbeattc@gmail.com
                </a>
                <p>for more info!</p>
              </div>
            </div>
          </div>
        </div>
        <div
          id='kev-card'
          className='flex flex-col sm:flex-row gap-4 sm:max-h-[450px]'
        >
          <div className='flex-1 sm:max-h-[450px]'>
            <img
              src={KEV_HOME}
              alt='image of runner drinking coffee looking out in the distance'
              className='rounded-lg object-cover w-full h-72 sm:h-full sm:w-full sm:object-center'
            />
          </div>
          <div className='bg-red-800 text-white p-8 rounded-lg text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold flex justify-center items-center flex-1'>
            <div className='flex items-center flex-wrap justify-center w-full'>
              <FaQuoteLeft size={30} className='inline self-start' />{' '}
              <span className='mx-2'>
                People who all have similar passions and goals. Just running
                around the streets of Hartford, having a great time.
              </span>
              <FaQuoteRight size={30} className='inline self-end' />
            </div>
          </div>
        </div>
        <div id='footer-logos' className='w-full relative'>
          <ul className='flex flex-grow flex-wrap justify-evenly md:grid md:grid-cols-2 lg:grid-cols-3 p-4 w-full md:justify-center items-center'>
            {LOGOS.map((logo) => (
              <li
                key={logo.id}
                className='w-32 h-32 gap-2 md:w-full md:h-full text-center items-center justify-center flex p-2'
              >
                <Link to={logo.link} target='_blank'>
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className='object-contain rounded-lg max-w-[314px] w-full h-full'
                    draggable='false'
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Home;
