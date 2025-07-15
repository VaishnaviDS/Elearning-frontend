import React, { useEffect, useState } from 'react';
import "./coursedescription.css";
import { useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
import Loading from '../../components/loading/Loading';
import { UserData } from '../../context/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const{fetchUser}=UserData()
  const { fetchCourse, course ,fetchCourses,fetchMyCourse} = CourseData();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      await fetchCourse(params.id); // Fetch new course based on ID
      setLoading(false); // Stop loading once course is fetched
    };
    fetchData();
  }, [params.id]); // Run when the course ID changes
  const checkoutHandler=async()=>{
    const token=localStorage.getItem("token")
    const {data: { order },} = await axios.post(`${server}/api/course/checkout/${params.id}`,{},
      {
        headers: {
          token,
        },
      }
    );
    const options = {
      key: "rzp_test_qQqaWoABR1ENY7", // Enter the Key ID generated from the Dashboard
      amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "E learning", //your business name
      description: "Learn with us",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            }
          );

          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#8a4baf",
      },
    };
    const razorpay = new window.Razorpay(options);

    razorpay.open();
  }

  //if (loading || !course) return <Loading />; // Don't render course until fetched
  if (
    loading ||
    !course ||                     // course not loaded
    course._id !== params.id      // course loaded but not correct course
  )
    return <Loading />;
  return (
    <div className='course-desc'>
      <div className='course-header'>
        <img src={`${server}/${course.image}`} alt='' className='course-image' />
        <div className='course-info'>
          <h2>{course.title}</h2>
          <p>Instructor: {course.createdBy}</p>
          <p>Duration: {course.duration} weeks</p>
        </div>
        <p>Let's start the course at ₹{course.price}</p>
        {user && user.subscription.includes(course._id) ? (
          <button onClick={() => navigate(`/course/study/${course._id}`)} className='btn'>
            Study
          </button>
        ) : (
          <button onClick={checkoutHandler} className='btn'>Buy now</button>
        )}
      </div>
    </div>
  );
};

export default CourseDescription;




// import React, { useEffect, useState } from 'react';
// import './coursedescription.css';
// import { useNavigate, useParams } from 'react-router-dom';
// import { CourseData } from '../../context/CourseContext';
// import { server } from '../../main';
// import Loading from '../../components/loading/Loading';
// import { UserData } from '../../context/UserContext';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const CourseDescription = ({ user }) => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const { fetchUser } = UserData();
//   const { fetchCourse, clearCourse, course, fetchCourses, fetchMyCourse } = CourseData();

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadCourse = async () => {
//       setLoading(true);
//       clearCourse(); // reset old course
//       await fetchCourse(params.id); // fetch new course
//       setLoading(false);
//     };
//     loadCourse();
//   }, [params.id]);

//   // ✅ BLOCK rendering if course not yet loaded or mismatched
//   if (
//     loading ||
//     !course ||                     // course not loaded
//     course._id !== params.id      // course loaded but not correct course
//   )
//     return <Loading />;

//   const checkoutHandler = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const {
//         data: { order },
//       } = await axios.post(`${server}/api/course/checkout/${params.id}`, {}, {
//         headers: {
//           token,
//         },
//       });

//       const options = {
//         key: "rzp_test_qQqaWoABR1ENY7",
//         amount: order.id,
//         currency: "INR",
//         name: "E learning",
//         description: "Learn with us",
//         order_id: order.id,
//         handler: async function (response) {
//           const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
//           try {
//             const { data } = await axios.post(`${server}/api/verification/${params.id}`, {
//               razorpay_order_id,
//               razorpay_payment_id,
//               razorpay_signature,
//             }, {
//               headers: {
//                 token,
//               },
//             });

//             await fetchUser();
//             await fetchCourses();
//             await fetchMyCourse();
//             toast.success(data.message);
//             navigate(`/payment-success/${razorpay_payment_id}`);
//           } catch (error) {
//             toast.error(error.response?.data?.message || "Verification failed");
//           }
//         },
//         theme: {
//           color: "#8a4baf",
//         },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Checkout failed");
//     }
//   };

//   return (
//     <div className='course-desc'>
//       <div className='course-header'>
//         <img src={`${server}/${course.image}`} alt='' className='course-image' />
//         <div className='course-info'>
//           <h2>{course.title}</h2>
//           <p>Instructor: {course.createdBy}</p>
//           <p>Duration: {course.duration} weeks</p>
//         </div>
//         <p>Let's start the course at ₹{course.price}</p>

//         {user && user.subscription.includes(course._id) ? (
//           <button onClick={() => navigate(`/course/study/${course._id}`)} className='btn'>
//             Study
//           </button>
//         ) : (
//           <button onClick={checkoutHandler} className='btn'>
//             Buy now
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseDescription;

