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
