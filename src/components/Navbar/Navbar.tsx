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
