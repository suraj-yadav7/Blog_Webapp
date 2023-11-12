import React,{useState,useEffect} from 'react'
import {useParams,useNavigate} from "react-router-dom"
import appwriteServices from "../appwrite/config"
import {Containers,PostForm} from "../components/index"



const Edit = () => {
    const [post, setPost] =useState([])
    const {slug} =useParams
    const navigate =useNavigate()
    useEffect(()=>{
        if(slug){
            appwriteServices.getPost(slug)
            .then((postRes) =>{
                setPost(postRes)})
        }
    },[])
  return (
    <div className='w-full py-8'>
        <Containers>
            
        </Containers>
    </div>
  )
}

export default Edit