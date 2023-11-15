import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import {Containers,Postcard} from "../components/index"
import appwriteServices from "../appwrite/config"


const Home = () => {
    const [posts,setPosts] =useState([])
    
    useEffect(()=>{
        appwriteServices.getAllpost([])
        .then((post)=>{
        if(post){
            setPosts(post.documents)
            }
        })
    },[])
  
    if(posts.length ===0){
        return(
            <div className="w-full py-8 mt-4 text-center">
                <Containers>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover: text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Containers>
            </div>

        )
    }
    return (
        <div className='w-full py-8'>
            <Containers>
                <div className='flex flex-wrap'>
                    { posts && posts.map((postItem)=>(
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

export default Home;