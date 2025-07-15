import React from 'react'
import "./account.css"
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserData } from '../../context/UserContext';
const Account = ({user}) => { //props
  const {setIsAuth,setUser}=UserData()
   const navigate=useNavigate()
  const logoutHandler=()=>{
    localStorage.clear();
    setUser([]);
    setIsAuth(false)
    toast.success("Logged out")
    navigate("/login")
  }
  return (
    <div>
    {user &&     <div className='profile'>
        <h2>My Profile</h2>
        <div className='profile-info'>
            <p>
                <strong>Name:{user.name}</strong>
            </p>
            <p>
                <strong>Email :{user.email}</strong>
            </p>
            {user.role=="user" && <button onClick={()=>navigate(`/${user._id}/dashboard`)} className='btn' style={{ marginRight: '10px' }}>
            <MdDashboardCustomize />Dashboard</button>}
            {user.role ==="admin" && (
            <button onClick={()=>navigate(`/admin/dashboard`)} className='btn' style={{ marginRight: '10px' }}>
            <MdDashboardCustomize />Admin Dashboard</button>
            )}
            <button onClick={logoutHandler} className='btn' style={{backgroundColor:"red"}}>
            <MdOutlineLogout />Logout</button>
        </div>
    </div>}
    </div>
  )
}

export default Account