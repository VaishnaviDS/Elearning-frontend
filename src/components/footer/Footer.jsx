import React from 'react'
import "./footer.css"
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
const Footer = () => {
  return (
    <footer>
        <div className='foot-content'>
            <p>
            {/* &copy it is used for copywright symbol */}
                &copy; 2025 Your E-learning Platform.All rights reserved.<br />
                Made with ❤️ <a href='Githublink'>Vaishnavi Sakpal</a>
            </p>
            <div className='social-links'>
                <a href=''><AiFillFacebook /></a>
                <a href=''><AiOutlineInstagram/></a>
            </div>
        </div>
    </footer>
  )
}

export default Footer