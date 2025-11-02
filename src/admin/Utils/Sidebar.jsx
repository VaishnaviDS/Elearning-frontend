import React from 'react'
import "./common.css"
import { Link } from 'react-router-dom'
import { IoHomeSharp } from "react-icons/io5";
import { FaBook, FaUser } from "react-icons/fa";
import { AiFillProfile } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa"; // ✅ New icon

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="brand">E-Learning</div>
      <ul>
        <li>
          <Link to={`/admin/dashboard`}>
            <div className='icons'><IoHomeSharp /></div>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to={`/admin/course`}>
            <div className='icons'><FaBook/></div>
            <span>Course</span>
          </Link>
        </li>
        <li>
          <Link to={`/admin/users`}>
            <div className='icons'><FaUser/></div>
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link to={`/admin/testimonials`}>  {/* ✅ New route */}
            <div className='icons'><FaCommentDots/></div>
            <span>Testimonials</span>
          </Link>
        </li>
        <li>
          <Link to={`/account`}>
            <div className='icons'><AiFillProfile/></div>
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;
