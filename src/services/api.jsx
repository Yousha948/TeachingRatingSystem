// Fetch top-rated teachers
export const getTopTeachers = async () => {
    try {
      const response = await fetch('/api/teachers');
      const data = await response.json();
      return data.sort((a, b) => b.avg_rating - a.avg_rating).slice(0, 5);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      return [];
    }
  };
  
  // Fetch courses based on semester
  export const getCoursesBySemester = async (semester) => {
    try {
      const response = await fetch(`/api/courses?semester=${semester}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching courses by semester:', error);
      return [];
    }
  };
  
  // Submit a rating
  export const submitRating = async (ratingData) => {
    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }
  
      return true; // Rating successfully submitted
    } catch (error) {
      console.error('Error submitting rating:', error);
      return false;
    }
  };
  
  // Fetch all teachers with ratings (sorted in descending order)
  export const getAllTeachers = async () => {
    try {
      const response = await fetch('/api/teachers');
      const data = await response.json();
      return data.sort((a, b) => b.avg_rating - a.avg_rating);
    } catch (error) {
      console.error('Error fetching all teachers:', error);
      return [];
    }
  };
  