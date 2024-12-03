import React from 'react';

const SemesterSelect = ({ onSelectSemester }) => {
  const handleChange = (e) => {
    onSelectSemester(e.target.value);
  };

  return (
    <div className="mb-3">
      <label htmlFor="semester" className="form-label">Select Semester</label>
      <select id="semester" className="form-select" onChange={handleChange}>
        <option value="">Select a semester</option>
        <option value="8th">8th semester</option>
        <option value="7th">7th Semester</option>
        <option value="6th">6th Semester</option>
        <option value="5th">5th Semester</option>
        <option value="4th">4th Semester</option>
        <option value="3rd">3rd Semester</option>
        <option value="2nd">2nd semester</option>
        <option value="1st">1st semester</option>
      </select>
    </div>
  );
};

export default SemesterSelect;
