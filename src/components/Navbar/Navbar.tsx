/*
    Copyright 2023 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex w-full justify-center items-center'>
      <ul className='flex gap-6 w-full justify-between items-center'>
        <li>Home</li>
        <li>Team</li>
        <li>Schedule</li>
        <li>Results</li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Sign up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
