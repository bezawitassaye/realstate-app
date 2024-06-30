// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Signin from './pages/SignIn';
import SignOut from './pages/SignOut';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import ListingDetail from './pages/ListingDetail';
import Listing from './pages/Listing';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update/:id" element={<ListingDetail />} />

        </Route>
        
        {/* Correct the Route for listing detail */}
        
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignOut />} />
      </Routes>
    </Router>
  );
};

export default App;
