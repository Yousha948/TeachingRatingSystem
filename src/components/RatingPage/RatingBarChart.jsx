import React from 'react';
import { Bar } from 'react-chartjs-2';

const RatingBarChart = ({ courses }) => {
  const labels = courses.map((course) => course.name);
  const clarityRatings = courses.map((course) => course.rating.clarity);
  const engagementRatings = courses.map((course) => course.rating.engagement);
  const contentRatings = courses.map((course) => course.rating.content);

  const data = {
    labels,
    datasets: [
      { label: 'Clarity', data: clarityRatings, backgroundColor: 'rgba(255, 99, 132, 0.5)' },
      { label: 'Engagement', data: engagementRatings, backgroundColor: 'rgba(54, 162, 235, 0.5)' },
      { label: 'Content', data: contentRatings, backgroundColor: 'rgba(75, 192, 192, 0.5)' },
    ],
  };

  const options = { responsive: true, plugins: { legend: { position: 'top' } } };

  return <Bar data={data} options={options} />;
};

export default RatingBarChart;
