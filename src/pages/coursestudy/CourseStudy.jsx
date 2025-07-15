import React, { useEffect, useState } from 'react';
import './coursestudy.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
import Loading from '../../components/loading/Loading';

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, clearCourse, course } = CourseData();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== 'admin' && !user.subscription.includes(params.id)) {
      navigate('/');
      return;
    }

    const loadCourse = async () => {
      setLoading(true);
      clearCourse();
      await fetchCourse(params.id);
      setLoading(false);
    };

    loadCourse();
  }, [params.id, user]);

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
      </div>

      {/* Right Section */}
      <div className='course-study-right'>
        <img src={`${server}/${course.image}`} alt='Course' />
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
