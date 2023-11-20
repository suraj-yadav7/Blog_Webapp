import React, { useCallback, useEffect} from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'
import appWriteServices from "../../appwrite/config"
import {Button, Input, Select, RTE} from "../index"
import {useForm} from "react-hook-form"

const PostForm = ({editData}) => {
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const {register, handleSubmit, watch, setValue, getValues, control} = useForm({
      defaultValues:{
        title:editData?editData.title :"",
        slug:editData ? editData.$id : "",
        content: editData ? editData.content : "",
        status: editData ? editData.status : "active"
      }
    })

    //it handle the user update input data and also create a new post
    const submitData = async (data)=>{
      // here edit data is passed from edit component when author(owner) tries to update the content.
        if(editData){
          const file = data.image[0] ? await appWriteServices.uploadFile(data.image[0]):null;
          if(file){
            appWriteServices.deleteFile(editData.featuredImage)
          }
          const dbPost = await appWriteServices.updatePost(editData.$id,{
            ...data,
            featuredImage: file? file.$id : undefined
          })
          if(dbPost){
            navigate(`/post/${dbPost.$id}`)
          }
        }
        else{
          const file=data.image[0]? await appWriteServices.uploadFile(data.image[0]):null
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

    // slug transform convert title into link with "-" instead of space" "
    const slugTransform = useCallback((value)=>{
        if(value && typeof(value) === "string"){
          return value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g,"-")
          .replace(/\s/g,"-")
        }
        return ""
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
    <form className='flex flex-wrap' onSubmit={handleSubmit(submitData)}> 
      <div className='w-2/3 px-2'>
        <Input 
          label="Title"
          placeholder="title"
          className="mb-4"
          {...register("title",{
            required:true
          })}
         />
        <Input 
          label="Slug"
          placeholder="slug"
          className="mb-4"

          {...register("slug",{
            required:true
          })}
          onInput={(e)=>{
            setValue("slug", slugTransform(e.currentTarget.value),{shouldValidate:true})
          }}
         />
         <RTE label="Content" name="content"  control={control} defaultValue={getValues(["title", "content","slug","status"])} />
      </div>
      <div className='w-1/3 px-2'>
        <Input 
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {required: !editData})}
          />
          {/* it will be visible only in edit post as post props is passed from Edit Component */}
          {editData && (<div className='w-full mb-4'>
                <img src={appWriteServices.getFilePreview(editData.featuredImage)}
                alt={editData.title}
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
        <Button type='submit' bgColor={editData? "bg-green-500":undefined} className='w-full'  >{editData ? "Update":"Submit"}</Button> 
      </div>
    </form>
    </>
  )
};

export default PostForm;