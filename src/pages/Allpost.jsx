import React,{useState,useEffect} from 'react'
import {Containers, Postcard} from "../components/index"
import appwriteServices from "../appwrite/config"
const Allpost = () => {
  const [posts,setPosts] =useState([])
  console.log("post depth propertites: ", posts)
useEffect(()=>{
appwriteServices.getAllpost([])
.then((post)=>{
  if(post){
    setPosts(post.documents)
  }
})
},[])
  return (
    <div className='w-full py-8'>
      <Containers>
        <div className='flex flex-wrap'>
        {
          posts && posts.map((postItem)=>(
            <div key={postItem.$id} className='p-2 w-1/4' >
              <Postcard id={postItem.$id} title={postItem.title} featuredImage={postItem.featuredImage} />
            </div>
          ))
        }
        </div>
      </Containers>
    </div>
  )
}

export default Allpost;