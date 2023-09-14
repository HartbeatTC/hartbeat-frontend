/*
    Copyright 2023 Hartbeat Track Club. All rights reserved.
    This file or parts thereof may not be reproduced in any form, stored in any retrieval system,
    or transmitted in any form by any means—electronic, mechanical, photocopy, recording, or
    otherwise, without prior written permission of Hartbeat Track Club, except as provided by
    United States of America copyright law and fair use.
    */

import { useState } from 'react';
import { AuthFormProps } from '../../interfaces/AuthFormProps';
const AuthForm = ({ name, capName }: AuthFormProps) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h1>AuthForm to {capName}</h1>

      <form name={name}>
        {name === 'signup' && (
          <>
            <div>
              <label htmlFor=''>Firstname</label>
              <input type='text' className='border-black border-2' />
            </div>
            <div>
              <label htmlFor=''>Lastname</label>
              <input type='text' className='border-black border-2' />
            </div>
          </>
        )}
        <div>
          <label htmlFor=''>Email</label>
          <input type='email' className='border-black border-2' />
        </div>
        <div>
          <label htmlFor=''>Password</label>
          <input type='password' className='border-black border-2' />
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
