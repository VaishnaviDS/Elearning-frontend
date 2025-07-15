import { useContext, useState,useEffect } from "react";
import { createContext } from "react";
import { server } from "../main";
import axios from "axios";

const CourseContext=createContext()

export const CourseContextProvider=({children})=>{
    const [courses,setCourses]=useState([])
    const [course,setCourse]=useState([])
    const [mycourse,setMyCourse]=useState([])
    async function fetchCourses() {
  try {
    const { data } = await axios.get(`${server}/api/course/all`);
    console.log("Fetched from API:", data);
    setCourses(data.courses);
  } catch (error) {
    console.error(error);
  }
}
async function fetchCourse(id) { // in params we have id
    try {
        const {data}=await axios.get(`${server}/api/course/${id}`)
        setCourse(data.course) //for course look at backend in routes in controllers
        return data.course;
    } catch (error) {
        console.log(error)
        return null
    }
}
async function fetchMyCourse() {
  try {
    const {data}=await axios.get(`${server}/api/mycourse`,{
      headers:{
      token:localStorage.getItem("token")
    },
    })
    setMyCourse(data.courses)
  } catch (error) {
    console.log(error)
  }
}
const clearCourse = () => {
  setCourse(null);
};
    useEffect(()=>{
        fetchCourses();
        fetchMyCourse();
    },[])
    return <CourseContext.Provider value={{courses,fetchCourses,fetchCourse
    ,course,fetchMyCourse,mycourse,clearCourse}}>{children}</CourseContext.Provider>
}

export const CourseData =()=> useContext(CourseContext)