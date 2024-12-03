import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = ({ isLoggedIn }) => {
  return (
    <div className="homepage">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome to the Teaching Rating System</h1>
        <p>
          Rate your teachers, view top-rated instructors, and explore courses.
          Login to start rating!
        </p>

        {isLoggedIn ? (
          <>
            <h2>Welcome back! What would you like to do?</h2>
            <br />
            <Link to="/ratingform">
              <button className="btn btn-primary">Rate a Teacher</button>
            </Link>
            <br />
            <br />
            <Link to="/ratingspage">
              <button className="btn btn-primary">See Ratings</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
            <br />
            <br />
            <Link to="/register">
              <button className="btn btn-primary">Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
