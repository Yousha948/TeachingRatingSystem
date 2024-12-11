import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {


    fetchData();
  }, []);
      // Fetch top-rated teachers and courses from your API
      const fetchData = async () => {
        try {
          const teacherResponse = await axios.get('http://localhost:5000/dashboard/top-rated-teachers');
          const courseResponse = await axios.get('http://localhost:5000/dashboard/top-rated-courses');
          console.log(teacherResponse);
          console.log(courseResponse);
          setTeacherData(teacherResponse.data);
          setCourseData(courseResponse.data);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };
  // Prepare data for the top-rated teachers chart
  const teacherChartData = {
    labels: teacherData.map(teacher => teacher.name),
    datasets: [{
      label: 'Teacher Rating',
      data: teacherData.map(teacher => teacher.average_rating),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  // Prepare data for the top-rated courses by semester chart
  const courseChartData = {
    labels: courseData.map(course => `${course.name} (Semester ${course.semester})`),
    datasets: [{
      label: 'Course Rating',
      data: courseData.map(course => course.average_rating),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }],
  };

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>

      <div className="dashboard-section">
        <h3>Top Rated Teachers</h3>
        <Bar data={teacherChartData} />
      </div>

      <div className="dashboard-section">
        <h3>Top Rated Courses by Semester</h3>
        <Bar data={courseChartData} />
      </div>
    </div>
    // <h1 style={{marginTop:"0px"}}>Hello 
    //   gdsdfgdsfgds
    //   ggdgdsgdgdf
    // </h1>
  );
};

export default Dashboard;
