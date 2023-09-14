import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from './AppRoutes.js';
import { Navbar, AppRoutesContainer } from './components';
import { useEffect } from 'react';
import { fetchUser } from './redux/features/authSlice.js';
import { RootState } from './redux/store/index.js';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser() as any);
    }
  }, [dispatch, user]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <AppRoutesContainer>
        <AppRoutes />
      </AppRoutesContainer>
      <footer> FOOTER </footer>
    </div>
  );
}

export default App;
