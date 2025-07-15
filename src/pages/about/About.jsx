import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to our platform! We are a dedicated team passionate about creating intuitive and efficient web solutions.
      </p>
      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          To simplify lives through powerful, user-friendly digital tools.
        </p>
      </div>
      <div className="about-section">
        <h2>Our Vision</h2>
        <p>
          To be a leading provider of innovative tech solutions that empower individuals and businesses.
        </p>
      </div>
      <div className="about-section">
        <h2>Meet the Team</h2>
        <p>
          Our team is made up of developers, designers, and problem-solvers who love what they do.
        </p>
      </div>
    </div>
  );
};

export default About;
