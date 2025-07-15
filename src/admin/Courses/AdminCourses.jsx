import React, { useState } from 'react';
import Layout from '../Utils/Layout';
import { CourseData } from '../../context/CourseContext';
import { useNavigate } from 'react-router-dom';
import './admincourses.css';
import CourseCard from '../../components/coursecard/CourseCard';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../../main';
import { FaEdit } from 'react-icons/fa';

const categories = [
  "Web development",
  "App development",
  "Data science",
  "Artificial intelligence"
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  if (user && user.role !== "admin") return navigate("/");

  const { courses, fetchCourses } = CourseData();

  const [searchTerm, setSearchTerm] = useState('');
  const [viewCourse, setViewCourse] = useState(null);
  const [editCourse, setEditCourse] = useState(null);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState(null);
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    if (image) myForm.append("file", image);

    try {
      let response;

      if (editCourse) {
        response = await axios.put(`${server}/api/course/${editCourse._id}`, myForm, {
          headers: { token: localStorage.getItem("token") }
        });
      } else {
        response = await axios.post(`${server}/api/course/new`, myForm, {
          headers: { token: localStorage.getItem("token") }
        });
      }

      toast.success(response.data.message);
      await fetchCourses();

      // Reset form
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit course");
      setBtnLoading(false);
    }
  };

  const resetForm = () => {
    setImage(null);
    setTitle("");
    setDescription("");
    setDuration("");
    setImagePrev("");
    setCategory("");
    setCreatedBy("");
    setPrice("");
    setEditCourse(null);
    setBtnLoading(false);
  };

  const filteredCourses = courses?.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (course) => {
    setViewCourse(null);
    setEditCourse(course);
    setTitle(course.title);
    setDescription(course.description);
    setCategory(course.category);
    setPrice(course.price);
    setCreatedBy(course.createdBy);
    setDuration(course.duration);
    setImage(null);
    setImagePrev(`${server}/${course.image}`);
  };

  return (
    <Layout>
      <div className="admin-courses">
        <div className="left">
          <h1>All Courses</h1>
          <input
            type="text"
            placeholder="Search course..."
            className="search-box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="dashboard-list">
            {filteredCourses && filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <div key={course._id} className="course-list-item">
                  <span onClick={() => {
                    setEditCourse(null);
                    setViewCourse(course);
                  }}>{course.title}</span>

                  <span>₹{course.price}</span>

                  <FaEdit
                    className="edit-icon"
                    title="Edit Course"
                    onClick={() => handleEditClick(course)}
                  />
                </div>
              ))
            ) : (
              <p>No courses found.</p>
            )}
          </div>
        </div>

        <div className="right">
          {viewCourse && (
            <div className="selected-course-card">
              <button className="back-btn" onClick={() => setViewCourse(null)}>← Back to form</button>
              <CourseCard course={viewCourse} />
            </div>
          )}

          {!viewCourse && (
            <div className="add-course">
              <div className="course-form">
                <h2>{editCourse ? "Edit Course" : "Add Course"}</h2>
                <form onSubmit={submitHandler}>
                  <label>Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                  <label>Description</label>
                  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />

                  <label>Price</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

                  <label>Created By</label>
                  <input type="text" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} required />

                  <label>Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option value={cat} key={cat}>{cat}</option>
                    ))}
                  </select>

                  <label>Duration</label>
                  <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />

                  <label>Upload Image</label>
                  <input type="file" onChange={changeImageHandler} />
                  {imagePrev && <img src={imagePrev} width={300} alt="preview" />}

                  <button type="submit" disabled={btnLoading} className="btn">
                    {btnLoading ? "Please wait..." : (editCourse ? "Update" : "Add")}
                  </button>

                  {editCourse && (
                    <button
                      type="button"
                      className="btn cancel-btn"
                      onClick={resetForm}
                    >
                      Cancel Edit
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
