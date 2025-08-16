import './App.css';
import MainRoutes from './routes/MainRoutes';
import useAuthStore from './store/authStore';

function App() {
   const { isAuthenticated} = useAuthStore();

  return (
    <>
      <MainRoutes isAuthenticated={isAuthenticated} />
    </>
  );
}

export default App;
