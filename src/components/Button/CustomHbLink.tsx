import { Link } from 'react-router-dom';

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

const CustomHbLink = ({ to, children }: CustomLinkProps) => (
  <li className='w-46 rounded-3xl p-3 hover:opacity-50 bg-hb-red'>
    <Link to={to} className='p-4 block text-white'>
      {children}
    </Link>
  </li>
);

export default CustomHbLink;
