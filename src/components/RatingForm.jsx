import React, { useState, useEffect } from 'react';

const RatingForm = () => {
  const [semester, setSemester] = useState(''); // Track the selected semester
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [ratings, setRatings] = useState({
    clarity: 0,
    engagement: 0,
    content: 0,
  });
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (semester) fetchCourses(semester);
  }, [semester]);

  const fetchCourses = async (semester) => {
    try {
      const response = await fetch(`http://localhost:5000/courses/courses?semester=${semester}`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ratingData = {
      course_id: selectedCourse,
      clarity: ratings.clarity,
      engagement: ratings.engagement,
      content: ratings.content,
      descriptive: comment,
    };

    try {
      const response = await fetch('http://localhost:5000/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData),
      });
      if (response.ok) {
        alert('Your rating has been submitted!');
      } else {
        alert('There was an issue submitting your rating.');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="semester" className="form-label">Select Semester</label>
        <select
          id="semester"
          className="form-select"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="">Select a semester</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>
      </div>

      {semester && (
        <div className="mb-3">
          <label htmlFor="course" className="form-label">Select Course</label>
          <select
            id="course"
            className="form-select"
            value={courses}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="clarity" className="form-label">Clarity</label>
        <input
          type="number"
          id="clarity"
          className="form-control"
          min="1"
          max="10"
          value={ratings.clarity}
          onChange={(e) => setRatings({ ...ratings, clarity: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="engagement" className="form-label">Engagement</label>
        <input
          type="number"
          id="engagement"
          className="form-control"
          min="1"
          max="10"
          value={ratings.engagement}
          onChange={(e) => setRatings({ ...ratings, engagement: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="content" className="form-label">Content</label>
        <input
          type="number"
          id="content"
          className="form-control"
          min="1"
          max="10"
          value={ratings.content}
          onChange={(e) => setRatings({ ...ratings, content: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="comment" className="form-label">Comments</label>
        <textarea
          id="comment"
          className="form-control"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">Submit Rating</button>
    </form>
  );
};

export default RatingForm;
