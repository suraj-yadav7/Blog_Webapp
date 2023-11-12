import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import authServices from '../appwrite/auth';
import { useForm } from 'react-hook-form'
import {Button, Input, Logo} from "./index"


const SignUp = () => {
    const [error , setError] = useState('')
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()
    
    const singup = async (data)=>{
        setError("")
        try {
            const singupSession = await authServices.createAccount(data)
            if(singupSession){
                const userData = await authServices.getCurrentUser()
                if(userData) dispatchEvent(authLogin(userData));
                navigate("/login")
            }
            
        } catch (error) {
            setError(error)
        }
    }
  return (

        <div className='flex items-center justify-center w-full'>
        <div className='mx-auto w-full max-w-1g bg-gray-100 rounded-×l p-10 border border-black/10'>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block max-w-[100px] w-full'>
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up create new account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link to="/signin" className="font-medium text-primary transition-all duration-200 hover:underline" >
                    Sign in
                </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error} </p>}
                <form className="mt-8" onSubmit={handleSubmit(login)} >
                    <div className='space-y-5'>
                    <Input 
                    label="name"
                    type="text"
                    placeholder="Enter your name" {...register("name",{
                        required:true
                    })} />
                    <Input 
                    label="email"
                    type="email"
                    placeholder="Enter your email" {...register("email",{
                        required:true,
                        validate:{
                            matchPatern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                            .test(value) || "Enter valid email address"
                        }
                    })} />
                    <Input 
                    label="password"
                    type="password"
                    placeholder="Enter your password" {...register("password",{
                        required:true
                    })} />
                    <Button className='w-full' type="submit">Sign Up</Button>
                    </div>
                </form> 
        </div>
        </div>
  )
}

export default SignUp;