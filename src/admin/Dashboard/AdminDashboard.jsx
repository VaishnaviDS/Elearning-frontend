import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../Utils/Layout';
import axios from 'axios';
import { server } from '../../main';
import "./dashboard.css"

const AdminDashboard = ({user}) => {
    const navigate=useNavigate();
    if(user && user.role!=="admin") return navigate("/")
    const [stats,setStats]=useState([])
async function fetchStats() {
    try {
        const {data}=await axios.get(`${server}/api/stats`,{
            headers:{token:localStorage.getItem("token")}
        })
        setStats(data.stats);

    } catch (error) {
        console.log(error)
    }
}
useEffect(()=>{
    fetchStats();
},[])
  return (
    <Layout>
        <div className='main-content'>
            <div className='box'>
                <p>Total courses:</p>
                <p>{stats.totalCourses}</p>
            </div>
            <div className='box'>
                <p>Total Lectures:</p>
                <p>{stats.totalLectures}</p>
            </div>
                <div className='box'>
                <p>Total users:</p>
                <p>{stats.totalUser}</p>
            </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard