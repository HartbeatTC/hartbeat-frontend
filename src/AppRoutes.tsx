import { Routes, Route } from 'react-router-dom';
import { AuthForm, PageNotFound } from './components';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<div>HOME</div>} />
      <Route
        path='/login'
        element={<AuthForm name='login' displayName='Login' />}
      />
      <Route
        path='/signup'
        element={<AuthForm name='signup' displayName='Sign Up' />}
      />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
