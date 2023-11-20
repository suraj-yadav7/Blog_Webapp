import React,{useState,useEffect} from 'react'
import {Containers, Postcard} from "../components/index"
import appwriteServices from "../appwrite/config"
import { editForm } from '../store/formSlice'
import { useDispatch } from 'react-redux';

const Allpost = () => {
  const [posts,setPosts] =useState([])
  const [loading, setLoading] = useState(true)
  const dispatch=useDispatch()
useEffect(()=>{
appwriteServices.getAllpost([])
.then((post)=>{
  if(post){
    setLoading(false)
    setPosts(post.documents)
  }
})
// makign formData slice initial value null
dispatch(editForm(null))
},[])
  return (
  <>{
    loading ? <div className='spinner'>
    <article></article>
    <p className='text-black opacity-75 mt-5 font-corrois text-lg'>Posts is loading....!</p>
  </div>

  :<div className='w-full py-8'>
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
        }
  </>
  )
}

export default Allpost;