import React, { useEffect, useState } from 'react';
import "./lecture.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../main';
import Loading from '../../components/loading/Loading';
import toast from 'react-hot-toast';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [btnloading, setBtnLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingLectureId, setEditingLectureId] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    navigate('/');
    return null;
  }

  const fetchLectures = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: { token: localStorage.getItem("token") }
      });
      setLectures(data.lectures);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLecture = async (id) => {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: { token: localStorage.getItem("token") }
      });
      setLecture(data.lecture);
    } catch (error) {
      console.error(error);
    } finally {
      setLecLoading(false);
    }
  };

  const handleEditLecture = (lec) => {
    setTitle(lec.title);
    setDescription(lec.description);
    setShow(true);
    setIsEditMode(true);
    setEditingLectureId(lec._id);
  };

  const changeFileHandler = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);

    const reader = new FileReader();
    reader.readAsDataURL(selected);
    reader.onloadend = () => setFilePreview(reader.result);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) formData.append("file", file);

    try {
      let res;
      if (isEditMode) {
        res = await axios.put(`${server}/api/lecture/${editingLectureId}`, formData, {
          headers: { token: localStorage.getItem("token") }
        });

        setLectures(prev =>
          prev.map(lec => (lec._id === editingLectureId ? res.data.lecture : lec))
        );
        fetchLecture(editingLectureId);
      } else {
        res = await axios.post(`${server}/api/course/${params.id}`, formData, {
          headers: { token: localStorage.getItem("token") }
        });

        setLectures(prev => [...prev, res.data.lecture]);
        fetchLecture(res.data.lecture._id);
      }

      toast.success(res.data.message);
      setTitle("");
      setDescription("");
      setFile(null);
      setFilePreview("");
      setShow(false);
      setIsEditMode(false);
      setEditingLectureId("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Delete this lecture?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: { token: localStorage.getItem("token") }
        });
        toast.success(data.message);

        setLectures(prev => prev.filter(lec => lec._id !== id));
        if (lecture._id === id) setLecture({});
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete");
      }
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <>
      {loading ? <Loading /> : (
        <div className='lecture-page'>
          <div className='left'>
            {lecLoading ? <Loading /> : (
              <>
                {lecture?.file ? (
                  <>
                    {lecture.fileType === "video" ? (
                      <video
                        src={`${server}/${lecture.file}`}
                        width="100%"
                        controls
                        controlsList="nodownload fullscreen"
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                    ) : lecture.fileType === "pdf" ? (
                      <iframe
                        src={`${server}/${lecture.file}`}
                        title="PDF"
                        width="100%"
                        height="500px"
                        style={{ border: "1px solid #ccc" }}
                      />
                    ) : <p>Unsupported file type</p>}
                    <h1>{lecture.title}</h1>
                    <h3>{lecture.description}</h3>
                  </>
                ) : <h1>Please select a lecture</h1>}
              </>
            )}
          </div>

          <div className='right'>
            {user?.role === "admin" && (
              <button onClick={() => setShow(!show)} className='btn'>
                {show ? "Close" : "Add Lecture"}
              </button>
            )}

            {show && (
              <div className='lecture-form'>
                <h2>{isEditMode ? "Edit Lecture" : "Add Lecture"}</h2>
                <form onSubmit={submitHandler}>
                  <label>Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  <label>Description</label>
                  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                  <label>Upload Video or PDF</label>
                  <input type="file" accept="video/*,application/pdf" onChange={changeFileHandler} required={!isEditMode} />
                  {filePreview && file?.type?.startsWith("video") && (
                    <video src={filePreview} width="300" controls />
                  )}
                  {filePreview && file?.type === "application/pdf" && (
                    <iframe src={filePreview} width="300" height="200" />
                  )}
                  <button type="submit" className="btn" disabled={btnloading}>
                    {btnloading ? "Uploading..." : isEditMode ? "Update" : "Add"}
                  </button>
                </form>
              </div>
            )}

            {lectures.length > 0 ? (
              lectures.map((e, i) => (
                <div
                  className={`lecture-number ${lecture._id === e._id ? "active" : ""}`}
                  key={e._id}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span onClick={() => fetchLecture(e._id)} style={{ cursor: "pointer" }}>
                      {i + 1}. {e.title}
                    </span>
                    {user?.role === "admin" && (
                      <span>
                        <button
                          onClick={(ev) => {
                            ev.stopPropagation();
                            handleEditLecture(e);
                          }}
                          style={{ marginRight: "5px" }}
                        ><MdEdit /></button>
                        <button
                          onClick={(ev) => {
                            ev.stopPropagation();
                            deleteHandler(e._id);
                          }}
                        ><MdDelete /></button>
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : <p>No lectures yet!</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;
