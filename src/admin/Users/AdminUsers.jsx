import React, { useEffect, useState } from 'react'
import "./users.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { server } from '../../main';
import Layout from '../Utils/Layout';
const AdminUsers = ({user}) => {
  const navigate=useNavigate();
  if(user && user.role!== "admin") return navigate("/")
    const [users,setUsers]=useState([]);
  async function fetchUsers() {
    try {
      const {data}=await axios.get(`${server}/api/users`,{
        headers:{token:localStorage.getItem("token")}
      })
      setUsers(data.users);
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchUsers();
  },[])
  console.log(users)
  return (
    <Layout>
      <div className='users'>
        <h1>All users</h1>
        <table border={"black"}>
          <thead>
            <tr>
              <td>#</td>
              <td>name</td>
              <td>email</td>
            </tr>
          </thead>
          {
            users && users.map((e,i)=>(
              <tbody>
                <tr>
                  <td>{i+1}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                </tr>
              </tbody>
            ))
          }
        </table>
      </div>
    </Layout>
  )
}

export default AdminUsers