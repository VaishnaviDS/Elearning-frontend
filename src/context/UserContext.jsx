import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import {server} from '../main'
import toast, {Toaster} from 'react-hot-toast'
const UserContext=createContext()

export const UserContextProvider=({children})=>{
    const [user,setUser]=useState([]); //login
    const [isAuth,setIsAuth]=useState(false);//login
    const [btnLoading,setBtnLoading]=useState(false);//login
    const [loading,setLoading]=useState(true)
    async function loginUser(email,password,navigate,fetchMyCourse) { //fetch api from backend
        setBtnLoading(true) //initially
        try {
            const {data}=await axios.post(`${server}/api/user/login`,{email,password})
            toast.success(data.message) //here the message is the one that we used to see in postman
            localStorage.setItem("token",data.token)// here toaster give notifications in UI
            setUser(data.user)
            setIsAuth(true)
            setBtnLoading(false)
            navigate("/")
            fetchMyCourse();// to solve the bug in video 20
        } catch (error) {
            setBtnLoading(false);
            setIsAuth(false)
            toast.error(error.response.data.message);
        }
    }

    async function registerUser(name,email,password,navigate) { //fetch api from backend
        setBtnLoading(true) //initially
        try {
            const {data}=await axios.post(`${server}/api/user/register`,{name,email,password})
            toast.success(data.message) //here the message is the one that we used to see in postman
            localStorage.setItem("activationToken",data.activationToken)// here toaster give notifications in UI
            setBtnLoading(false)
            navigate("/verify")
             setBtnLoading(false);
        } catch (error) {
             setBtnLoading(false);
            toast.error(error.response.data.message);
        }
    }

    async function verifyOtp(otp,navigate) {
        setBtnLoading(true);
        const activationToken=localStorage.getItem("activationToken")
        try {
            const {data}=await axios.post(`${server}/api/user/verify`,{otp,activationToken})
            toast.success(data.message)  
            navigate("/login") 
            localStorage.clear();//becoz we dont need the activation token
            setBtnLoading(false)
        } catch (error) {
            toast.error(error.response.data.message);      
            setBtnLoading(false);
        }
    }

    async function fetchUser(){// profile fetch
        try {
            const {data}=await axios.get(`${server}/api/user/me`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            setIsAuth(true)
            setUser(data.user)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchUser();
    },[])
    return <UserContext.Provider value={{user,setUser,setIsAuth,fetchUser,
    isAuth,loginUser,btnLoading,loading,registerUser,verifyOtp}}>{children} <Toaster/></UserContext.Provider>
}
export const UserData=()=>useContext(UserContext)