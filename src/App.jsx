import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import auth from "./appwrite/auth"
import { login,logout } from './store/authSlice'

function App() {
const [loading, setLoading] = useState(false)
const dispatch = useDispatch()

useEffect(()=>{
    auth.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout)
      }
    })
    .finally(()=>{
      setLoading(false)
    })
},[])

  return (
    <>
    {!loading ? <><div className=''>
       Home</div></>:null}
    </>
  )
}

export default App
