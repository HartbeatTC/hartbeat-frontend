import AppRoutes from './AppRoutes.js';
import { Navbar, AppRoutesContainer } from './components';

function App() {
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
