import React, { useEffect, useState } from "react";
import "./testimonials.css";
import axios from "axios";
import { server } from "../../main";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { UserData } from "../../context/UserContext";

const Testimonials = () => {
  const [topTestimonials, setTopTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = UserData();

  // ✅ Fetch testimonials (used on mount and refresh)
  const fetchTopTestimonials = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/testimonials/top4`);
      const validTestimonials = (data.testimonials || []).filter(
        (t) => t.course && t.user
      ); // ignore testimonials with deleted course/user
      setTopTestimonials(validTestimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopTestimonials();

    // ✅ Refresh testimonials when a course is deleted (admin triggers this event)
    const handleRefresh = () => fetchTopTestimonials();
    window.addEventListener("testimonialsUpdated", handleRefresh);

    return () => {
      window.removeEventListener("testimonialsUpdated", handleRefresh);
    };
  }, []);

  if (loading) return <Loading />;
  if (topTestimonials.length === 0)
    return <h3 className="no-testimonials">No testimonials yet.</h3>;

  return (
    <section className="testimonials">
      <h2 className="section-title">What Our Students Say</h2>

      <div className="testimonial-grid">
        {topTestimonials.map((t, i) => (
          <div
            className="testimonial-card fade-in"
            key={t._id || i}
          >
            <div className="student-image">
              <img
                src={
                  t.user?.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt={t.user?.name || "student"}
              />
            </div>

            <p className="message">“{t.comment}”</p>

            <div className="info">
              <p className="name">{t.user?.name}</p>
              <p className="position">⭐ {t.rating}/5</p>
            </div>

            <button
              onClick={() =>
                user?.role === "admin"
                  ? navigate(`/course/study/${t.course?._id}`)
                  : navigate(`/course/${t.course?._id}`)
              }
              className="explore-btn"
            >
              Explore {t.course?.title}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
