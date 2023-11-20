import React from 'react'
import { Outlet } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { useDispatch} from 'react-redux'
import auth from "./appwrite/auth"
import { login,logout } from './store/authSlice'
import { Footer, Header } from './components'

function App() {
const [loading, setLoading] = useState(true)
const dispatch = useDispatch()

  // If user is login then we are updating userdetails in the authSlice of initialState value. 
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
},[]);

  return (
      <>
      {!loading ? 
      <>
        <div className='min-h-screen flex flex-wrap content-between font-corrois'>
          <div className='w-full block'>
            <Header className="h-15" /> 
              <main className='h-full'>
                <Outlet style={{ height: 'calc(100% - 50px)' }} /> 
              </main>
          </div>
          <div className='w-full h-36'> 
            <Footer />
          </div>
        </div>
        </>
      :<div className='spinner'>
          <article></article>
          <p className='text-black opacity-75 mt-5 font-corrois text-lg'>Data is loading.... Please Wait....!</p>
        </div>
        }
      </>
  )
};

export default App; 
