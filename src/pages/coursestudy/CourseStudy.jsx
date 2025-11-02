import React, { useEffect, useState } from 'react';
import './coursestudy.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
import Loading from '../../components/loading/Loading';
import axios from 'axios';
import toast from 'react-hot-toast';

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, clearCourse, course } = CourseData();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [courseTestimonials, setCourseTestimonials] = useState([]);

  useEffect(() => {
    // Restrict non-admin users without access
    if (user && user.role !== 'admin' && !user.subscription.includes(params.id)) {
      navigate('/');
      return;
    }

    const loadCourse = async () => {
      setLoading(true);
      clearCourse();
      await fetchCourse(params.id);
      await fetchTestimonials();
      setLoading(false);
    };

    loadCourse();
  }, [params.id, user]);

  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get(`${server}/api/testimonials/course/${params.id}`);
      setCourseTestimonials(data.testimonials);
    } catch (error) {
      console.error('Error fetching testimonials', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    try {
      await axios.post(
        `${server}/api/testimonials`,
        { courseId: params.id, rating, comment },
        { headers: { token: localStorage.getItem('token') } }
      );

      toast.success('Testimonial added successfully!');
      setComment('');
      setRating(5);
      fetchTestimonials();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error adding testimonial');
    }
  };

  if (loading || !course || course._id !== params.id) return <Loading />;

  return (
    <div className='course-study'>
      {/* Left Section */}
      <div className='course-study-left'>
        <h2>{course.title}</h2>
        <div className='full-description'>
          <h4>Description:</h4>
          <p>{course.description}</p>
        </div>
        <h5>By - {course.createdBy}</h5>
        <h5>Duration - {course.duration} weeks</h5>

        {/* Testimonial Form (hidden for admin) */}
        {user && user.role !== 'admin' && (
          <div className='testimonial-form'>
            <h3>Leave a Testimonial</h3>
            <form onSubmit={handleSubmit}>
              <label>Rating (1-5)</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <textarea
                placeholder='Write your comment...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

              <button type='submit' className='submit-btn'>
                Submit
              </button>
            </form>
          </div>
        )}

        {/* Course Testimonials */}
        <div className='course-testimonials'>
          <h3>What students said about this course</h3>
          {courseTestimonials.length === 0 ? (
            <p>No testimonials yet.</p>
          ) : (
            courseTestimonials.map((t) => (
              <div key={t._id} className='course-testimonial-card'>
                <p>⭐ {t.rating}/5</p>
                <p>{t.comment}</p>
                <small>- {t.user?.name}</small>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className='course-study-right'>
        <img src={course.image} alt='Course' />
        <Link to={`/lectures/${course._id}`}>
          <h2>Lectures</h2>
        </Link>
      </div>
    </div>
  );
};

export default CourseStudy;






















// import React, { useEffect, useState } from 'react';
// import './coursestudy.css';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { CourseData } from '../../context/CourseContext';
// import { server } from '../../main';
// import Loading from '../../components/loading/Loading';

// const CourseStudy = ({ user }) => {
//   const params = useParams();
//   const { fetchCourse, clearCourse, course } = CourseData();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Redirect unauthorized users early
//     if (user && user.role !== 'admin' && !user.subscription.includes(params.id)) {
//       navigate('/');
//       return;
//     }

//     const loadCourse = async () => {
//       setLoading(true);
//       clearCourse();                      // Clear previous course
//       await fetchCourse(params.id);       // Fetch new course
//       setLoading(false);
//     };

//     loadCourse();
//   }, [params.id, user]);

//   if (loading || !course || course._id !== params.id) return <Loading />;

//   return (
//     <div className='course-study'>
//       <img src={`${server}/${course.image}`} width={350} alt="Course" />
//       <h2>{course.title}</h2>
//       <h4>Description-{course.description}</h4>
//       <h5>by - {course.createdBy}</h5>
//       <h5>Duration - {course.duration} weeks</h5>
//       <Link to={`/lectures/${course._id}`}>
//         <h2>Lectures</h2>
//       </Link>
//     </div>
//   );
// };

// export default CourseStudy;
