import React from 'react'
import { Outlet } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import auth from "./appwrite/auth"
import { login,logout } from './store/authSlice'
import { Footer, Header } from './components'

function App() {
const [loading, setLoading] = useState(true)
const dispatch = useDispatch()
  const userData= useSelector((state) => state.auth.userData)

  async function gettingUserStatus(){
    const currentUserData = await auth.getCurrentUser()
    if(currentUserData){
      dispatch(login(currentUserData))
    }
    else{
      dispatch(logout())
    }
    setLoading(false)
  } 

useEffect(()=>{
  gettingUserStatus()
},[])

  return (
    <>
      {!loading ? <>
      <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
        <div className='w-full block'>
          <Header />
          <main>
          TODO : <Outlet />
          </main>
          <Footer />
        </div>
      </div></>:<h1>Loading Please Wait...</h1>}
    </>
  )
}

export default App
