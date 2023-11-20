import React,{useState,useEffect} from 'react'
import appwriteServices from "../appwrite/config"
import {useParams,Link,useNavigate} from "react-router-dom"
import { useSelector } from 'react-redux'
import {Containers} from "../components/index"
import parse from "html-react-parser"
import {Button } from "../components/index"
import { useDispatch } from 'react-redux'
import { editForm } from '../store/formSlice'

const Post = () => {
    const [post, setPost] = useState(null)
    // here slug is Post ID , not a path
    const {slug} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector((state)=> state.auth.userData)
    const isAuthor= post && userData ? post.userId === userData.$id : false

    useEffect(()=>{
        if(slug){
            appwriteServices.getPost(slug)
            .then((postRes)=>{
                if(postRes) {
                    setPost(postRes)
                    // updating formSlice initialstate value : formData
                    dispatch(editForm(postRes))
                }
                else navigate("/")
            })
        }
        else{
            navigate("/")
        }
    },[slug,navigate])

    const deletePost= ()=>{
        appwriteServices.deletePost(post.$id)
            .then((status)=>{
                if(status){
                    appwriteServices.deleteFile(post.featuredImage);
                    navigate("/")
                }
            })
    }
  return post ? (
    <div className="py-8">
        <Containers>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={appwriteServices.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl"
                />

                {isAuthor && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
                {parse(post.content)}
                </div>
        </Containers>
    </div>
) : null;
}

export default Post;