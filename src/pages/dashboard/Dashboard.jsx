import React from 'react'
import "./dashboard.css"
import { CourseData } from '../../context/CourseContext'
import CourseCard from '../../components/coursecard/CourseCard'
const Dashboard = ({user}) => {
    const {mycourse}=CourseData();
    // console.log(mycourse)
  return (
    <div className='user-dashboard'>
      <h2>All enrolled courses</h2>
      <div className='dashboard-content'>
        {
          mycourse && mycourse.length>0 ? mycourse.map((e)=>(<CourseCard key={e._id} course={e} />)):
          <p>No courses enrolled</p>
        }
      </div>
    </div>
  )
}

export default Dashboard