import { Outlet, Navigate } from 'react-router-dom';
import { RootState, useAppSelector } from './redux/store';

const ProtectedRoutes = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  console.log({ user });

  return user && user.email !== null ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoutes;
