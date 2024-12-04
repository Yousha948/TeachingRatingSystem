import React from 'react';

const CourseSelect = ({ courses, onSelectCourse }) => {
  const handleChange = (e) => {
    onSelectCourse(e.target.value);
  };

  return (
    <div className="mb-3">
      <label htmlFor="course" className="form-label">Select Course</label>
      <select id="course" className="form-select" onChange={handleChange}>
        <option value="">Select a course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.course_code} - {course.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseSelect;
