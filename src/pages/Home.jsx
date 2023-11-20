import React,{useState,useEffect} from 'react'
import {Containers,Postcard} from "../components/index"
import appwriteServices from "../appwrite/config"
import { useSelector } from 'react-redux'

const Home = () => {
    const [posts,setPosts] =useState("")
    const userStatus = useSelector((state) => state.auth.status)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        appwriteServices.getAllpost([])
        .then((post)=>{
        if(post){
            setLoading(false)
            setPosts(post.documents)
            }
        })
     
    },[])
  
    if(userStatus === false){
        return(
            <div className="w-full  mt-4 text-center">
                <Containers>
                    <div className="flex flex-wrap  mt-20">
                        <div className="p-2 w-full flex justify-center items-center">
                            <h1 className="text-2xl font-bold hover: text-white-500">
                                Login to Read Posts
                            </h1>
                        </div>
                    </div>
                </Containers>
            </div>
        )
    }
    
    return (
        <>
        { loading? <div className='spinner'>
          <article></article>
          <p className='text-black opacity-75 mt-5 font-corrois text-lg'>Posts is loading....!</p>
        </div>
        :
        <div className='w-full'>
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
        }
        </>
    )
}

export default Home;