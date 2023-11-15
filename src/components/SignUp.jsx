import React,{useState} from 'react'
import {Link } from 'react-router-dom';
import authServices from '../appwrite/auth';
import { useForm } from 'react-hook-form'
import {Button, Input, Logo} from "./index"

const SignUp = () => {
    const [error , setError] = useState('')
    const [confirm , setConfirm] = useState("")
    //below are react-hook methods
    const {register, handleSubmit} = useForm()
    
    const signup = async (data)=>{
        try{
            const singupSession = await authServices.createAccount(data)
            console.log("signupsession", singupSession)
            if(singupSession){
                setConfirm("User Account Created Successfully ")
            }
        }catch(error){
            setError(error)
            console.log("error: ", error)
        }    
    };

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
                <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline" >
                    Sign in
                </Link>
                </p>
                {confirm && <div className='flex justify-center gap-4 items-center flex-col'>
                    <p className='text-green-600 mt-8 text-center'>{confirm}</p>
                    <Link to="/login">
                        <Button >Login</Button>
                    </Link>
                    </div>}

                {error && <p className='text-red-600 mt-8 text-center'>Error occured while creating a new user account</p>}

                <form className="mt-8" onSubmit={handleSubmit(signup)} >
                    <div className='space-y-5'>
                    <Input 
                    label="Name"
                    type="text"
                    placeholder="Enter your name" 
                    {...register("name",{
                        required:true
                    })} />
                    <Input 
                    label="Email"
                    type="email"
                    placeholder="Enter your email" 
                    {...register("email",{
                        required:true,
                        validate:{
                            matchPatern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                            .test(value) || "Enter valid email address"
                        }
                    })} />
                    <Input 
                    label="Password"
                    type="password"
                    placeholder="Enter your password" 
                    {...register("password",{
                        required:true
                    })} />
                    <Button  type="submit">Sign Up</Button>
                    </div>
                </form> 
        </div>
        </div>
  )
};

export default SignUp;