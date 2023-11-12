import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'
import appWriteServices from "../../appwrite/config"
import {Button, Input, Select} from "../index"
import {useForm} from "react-hook-form"

const PostForm = () => {
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    
    const {register, handleSubmit, watch, setValue, setValues, control} = useForm({
        title:post?.title || "",
        slug:post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active"

    })
    const submit = async ()=>{
        if(post){
          const file = data.image[0] ? appWriteServices.uploadFile(data.image[0]):null
          if(file){
            appWriteServices.deleteFile(post.featuredImage)
          }
          const dbPost = await appWriteServices.updatePost(post.$id,{
            ...data,
            featuredImage: file? file.$id : undefined
          })
          if(dbPost){
            navigate(`/post/${dbPost.$id}`)
          }
        }
        else{
          const file=await appWriteServices.uploadFile(data.image[0])
          if(file){
            const fileId = file.$id
            data.featuredImage=fileId
            const dbPost = await appWriteServices.createPost({...data,
            userId: userData.$id})
            if(dbPost){
              navigate(`/post/${dbPost.$id}`)
            }
          }
        }
    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof(value) === "string"){
          value.trim()
          .toLowerCase()
          .replace(/^[a-zA-Z\d\s]+/g,"-")
          .replace(/\s/g,"-")

          return ""
        }
    },[])

    useEffect(()=>{
      const subscription = watch((value,{name})=>{
        if(name ==="title"){
          setValue("slug", slugTransform(value.title,{
            shouldValidate:true
          }))
        }
      })
      return()=>{
        subscription.unsubscribe()
      }
    },[slugTransform,setValue,watch])

  return (
    <>
    <form className='flex flex-wrap' onSubmit={handleSubmit(submit)}> 
      <div className='w-2/3 px-2'>
        <Input 
          label="title"
          placeholder="title"
          className="mb-4"
          {...register("title",{
            required:true
          })}
         />
        <Input 
          label="slug"
          placeholder="slug"
          className="mb-4"
          {...register("slug",{
            required:true
          })}
          onInput={(e)=>{
            setValue("slug", slugTransform(e.currentTarget.value),{shouldValidate:true})
          }}
         />
         <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className='w-1/3 px-2'>
        <Input 
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png image/jpg image/jpeg image/gif"
          {...register("image", {required: !post})}
          />
          {post && (<div className='w-full'>
                <img src={appWriteServices.getFilePreview(post.featuredImage)}
                alt={post.title}
                className='rounded-lg'
                />
            </div>
            )}

        <Select 
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status",{
            required:true
          })}
        />
        <Button type='submit' bgColor={post? "bg-green-500":undefined} className='w-full' >{post ? "Update" :"Submit"} </Button> 
      </div>
    </form>
    </>
  )
}

export default PostForm;