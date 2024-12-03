import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Login/RegisterPage';
import RatingForm from './components/RatingForm';
import RatingsPage from './components/RatingPage/RatingPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* Define routes */}
        <Route
          path="/"
          element={<HomePage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route
          path="/ratingform"
          element={<RatingForm />}
        />
        <Route
          path="/ratingspage"
          element={<RatingsPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
