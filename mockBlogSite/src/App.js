import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './Header';
// import Blogs from './Blogs';

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App;
