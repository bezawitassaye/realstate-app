
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Signin from './pages/SignIn';
import SignOut from './pages/SignOut';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />   
        </Route>

        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<SignOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
