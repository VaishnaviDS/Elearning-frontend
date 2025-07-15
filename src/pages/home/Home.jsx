import React from 'react'
import {useNavigate} from 'react-router-dom' 
import './home.css'
import Testimonials from '../../components/testimonials/Testimonials'
// import Footer from '../../components/footer/Footer'

const Home = () => {
  const navigate=useNavigate()//this is to navigate from home to courses
  return (
    <div>
<div className='home'>
  <div className='home-content'>
    <div className='hero-row'>
      <h1>Welcome to E-learning Platform</h1>
      <img src="/i1.svg" alt="Learning" className="hero-img" />
    </div>
    <p>Learn, Grow, Excel</p>
    <button onClick={() => navigate("/courses")} className='btn'>Get Started</button>
  </div>
</div>
<Testimonials/>
    </div>
  )
}

export default Home