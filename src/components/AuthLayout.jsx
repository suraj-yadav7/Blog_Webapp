import React,{useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const AuthLayout = ({children, authentication=true}) => {
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state)=> state.auth.status)
    const navigate = useNavigate()

    const authhandle= (authentication)=>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }
    useEffect(()=>{
        authhandle(authentication)
    },[authStatus,authentication,navigate])
  return loader ? <h3>Loading...</h3>:<>{children}</>
}

export default AuthLayout;