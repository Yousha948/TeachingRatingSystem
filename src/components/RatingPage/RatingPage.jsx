import React, { useState, useEffect } from 'react';
import './RatingPage.css';
const RatingsPage = () => {
  const [ratings, setRatings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRatings, setFilteredRatings] = useState([]);

  useEffect(() => {
    // Fetch all ratings from the API
    const fetchRatings = async () => {
      try {
        const response = await fetch('http://localhost:5000/teachers/getAll'); // API endpoint to get teacher ratings
        const data = await response.json();
        setRatings(data);
        console.log(data);
        setFilteredRatings(data);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };
    fetchRatings();
  }, []);

  // Filter ratings based on the search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredRatings(
      ratings.filter((rating) =>
        rating.name.toLowerCase().includes(term)
      )
    );
  };

  return (
    <div className="ratings-page">
      <h1>All Teacher Ratings</h1>
      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a teacher..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="ratings-list mt-4">
        {filteredRatings.length > 0 ? (
          <ul className="list-group">
            {filteredRatings.map((teacher) => (
              <li key={teacher.id} className="list-group-item">
                <h5>{teacher.name}</h5>
                <p>Average Rating: {teacher.avg_rating}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No teachers found.</p>
        )}
      </div>
    </div>
  );
};

export default RatingsPage;
