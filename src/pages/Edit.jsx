import React from 'react'
import {Containers,PostForm} from "../components/index"
import { useSelector } from 'react-redux'

const Edit = () => {
  // pulling initialstate value from formSlice i.e formdata,  which is updated when user view on single post.
  const formdata = useSelector((state)=> state.formDt.formData)

  return (
    <div className='w-full py-8'>
        <Containers>
            <PostForm editData = {formdata} />
        </Containers>
    </div>
  )
};

export default Edit;