import React, { useState, useEffect } from 'react';
import './RatingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RatingsPage = () => {
  const [ratings, setRatings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRatings, setFilteredRatings] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teacherDetails, setTeacherDetails] = useState(null);

  useEffect(() => {
    // Fetch all ratings from the API
    const fetchRatings = async () => {
      try {
        const response = await fetch('http://localhost:5000/teachers/getAll'); // API endpoint to get teacher ratings
        const data = await response.json();
        setRatings(data);
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
      ratings.filter((rating) => rating.name.toLowerCase().includes(term))
    );
  };

  const fetchTeacherDetails = async (teacherId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/teachers/details/${teacherId}`
      ); // API endpoint to get teacher details by ID
      const data = await response.json();
      setTeacherDetails(data);
    } catch (error) {
      console.error('Error fetching teacher details:', error);
    }
  };

  const handleSeeDetails = (teacher) => {
    setSelectedTeacher(teacher);
    fetchTeacherDetails(teacher.id);
  };

  const handleCloseModal = () => {
    setSelectedTeacher(null);
    setTeacherDetails(null);
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
                <p>
                  Average Rating:{' '}
                  <b>
                    {parseFloat(teacher.avg_rating)
                      ? parseFloat(teacher.avg_rating).toFixed(2)
                      : 'No Rating Yet'}
                  </b>
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSeeDetails(teacher)}
                  data-bs-toggle="modal"
                  data-bs-target="#teacherDetailsModal"
                >
                  See Details
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No teachers found.</p>
        )}
      </div>

      {/* Modal for teacher details */}
      {selectedTeacher && (
        <div
          className="modal fade"
          id="teacherDetailsModal"
          tabIndex="-1"
          aria-labelledby="teacherDetailsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="teacherDetailsModalLabel">
                  {selectedTeacher.name} - Ratings Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                {teacherDetails ? (
                  teacherDetails.semesters.map((semester) => (
                    <div key={semester.id} className="semester-details mb-4">
                      <h6>Semester: {semester.name}</h6>
                      {semester.courses.map((course) => (
                        <div key={course.id} className="course-details mb-3">
                          <p><b>Course:</b> {course.name}</p>
                          <p><b>Rating:</b> {course.rating.toFixed(2)}</p>
                          <p><b>Comments:</b></p>
                          <ul>
                            {course.comments.map((comment, index) => (
                              <li key={index}>{comment}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <p>Loading details...</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingsPage;