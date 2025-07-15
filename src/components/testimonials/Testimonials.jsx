import React from 'react'
import "./testimonials.css"

const Testimonials = () => {
const testimonialsData = [
  {
    id: 1,
    name: "Aarav Mehta",
    position: "B.Tech - Computer Science",
    message:
      "The platform's hands-on projects and real-world case studies gave me practical experience that really boosted my confidence.",
    image:
      "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
  },
  {
    id: 2,
    name: "Sneha Reddy",
    position: "MBA Student",
    message:
      "The interactive content and easy explanations made even the most complex topics feel approachable. Highly recommended!",
    image:
      "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  {
    id: 3,
    name: "Vikram Singh",
    position: "M.Sc Data Science",
    message:
      "What I loved most was the mentorship. I could ask questions and get guidance at any step of the learning process.",
    image:
      "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
  },
  {
    id: 4,
    name: "Nikita Verma",
    position: "Engineering Graduate",
    message:
      "This platform helped me prepare for my campus placements with mock interviews and resume-building tips. Super helpful!",
    image:
      "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
];

  return (
    <section className='testimonials'>
        <h2>What our students say</h2>
        <div className='testimonials-cards'>
        {
            testimonialsData.map((e)=>(
                <div className='testimonial-card' key={e.id}>
                    <div className='student-image'>
                        <img src={e.image} alt=''/>
                    </div>
                    <p className='message'>{e.message}</p>
                    <div className='info'>
                        <p className='name'>{e.name}</p>
                        <p className='position'>{e.position}</p>
                    </div>
                </div>
            ))
        }
        </div>
    </section>
  )
}

export default Testimonials