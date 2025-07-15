import React, { useState } from 'react'
import './courses.css'
import { CourseData } from '../../context/CourseContext'
import CourseCard from '../../components/coursecard/CourseCard'

const Courses = () => {
  const { courses } = CourseData()
  const [searchTerm, setSearchTerm] = useState('')

  // Filter courses based on search term
  const filteredCourses = courses?.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='courses'>
      <h2>Available Courses</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search courses..."
        className="course-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='course-container'>
        {filteredCourses && filteredCourses.length > 0 ? (
          filteredCourses.map((e) => (
            <CourseCard key={e._id} course={e} />
          ))
        ) : (
          <p>No courses found</p>
        )}
      </div>
    </div>
  )
}

export default Courses
