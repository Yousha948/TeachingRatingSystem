import React from 'react';

const TeacherCard = ({ teacher }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{teacher.name}</h5>
        <p className="card-text">
          Average Rating: {teacher.avg_rating || 'Not rated yet'}
        </p>
      </div>
    </div>
  );
};

export default TeacherCard;
