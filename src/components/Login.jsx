import React, {useState}from 'react'
import { useDispatch } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import authServices from "../appwrite/auth"
import {login as authLogin} from "../store/authSlice"
import { useForm } from 'react-hook-form'
import {Button, Input, Logo} from "./index"

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error , setError] = useState("")

    //login user 
    const login = async(data)=>{
        setError("")
        try{
            const session = await authServices.userLogin(data)
            if(session){
                const userData = await authServices.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                navigate("/")
            }
        }
        catch(error){
            setError(error)
            console.log("error while login: ", error)
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
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline" >
                    Sign Up
                </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>Error occured while login</p>}
                <form className="mt-8" onSubmit={handleSubmit(login)} >
                    <div className='space-y-5'>
                        <Input label="email" placeholder="enter your mail ID" type="email" 
                        {...register("email",{
                            required:true,
                            validate:{
                                matchPatern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                                .test(value) || "Email address must be valid"
                            }
                        })}
                        />
                        <Input 
                        label="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password",{
                            required:"true"
                        })}
                        />
                        <Button type='submit'>Sign in</Button>
                    </div>
                </form> 
        </div>
    </div>
  )
};

export default Login;