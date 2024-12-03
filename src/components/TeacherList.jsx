import React from 'react';
import TeacherCard from './TeacherCard';

const TeacherList = ({ teachers }) => {
  return (
    <div className="row">
      {teachers.map((teacher) => (
        <div key={teacher.id} className="col-md-4">
          <TeacherCard teacher={teacher} />
        </div>
      ))}
      <h1>hello world</h1>
    </div>
  );
};

export default TeacherList;
