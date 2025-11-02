import React, { useEffect, useState } from "react";
import "./adminTestimonials.css";
import axios from "axios";
import { server } from "../../main";
import Layout from "../Utils/Layout";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";

const AdminTestimonials = ({ user }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== "admin") return;
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get(`${server}/api/testimonials`, {
        headers: { token: localStorage.getItem("token") },
      });
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?"))
      return;
    try {
      await axios.delete(`${server}/api/testimonials/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      toast.success("Testimonial deleted successfully!");
      fetchTestimonials();
    } catch (error) {
      toast.error("Error deleting testimonial");
    }
  };

  if (loading) return <Loading />;

  return (
    <Layout>
      <div className="admin-testimonials">
        <h1>All Testimonials</h1>
        {testimonials.length === 0 ? (
          <p>No testimonials found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Course</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t, i) => (
                <tr key={t._id}>
                  <td>{i + 1}</td>
                  <td>{t.user?.name || "Unknown"}</td>
                  <td>{t.course?.title || "N/A"}</td>
                  <td>⭐ {t.rating}/5</td>
                  <td>{t.comment}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(t._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default AdminTestimonials;
