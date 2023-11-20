import React, {useState}from 'react'
import { useDispatch } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import authServices from "../appwrite/auth"
import {login as authLogin} from "../store/authSlice"
import { useForm } from 'react-hook-form'
import {Button, Input} from "./index"

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
            setError(error.response.message)
            console.log("error while login: ", JSON.stringify(error))
        }
    }
  return (
    <div className=' flex items-center justify-center w-full'>
        <div className=' relative mx-auto w-1/2 my-5 max-w-1g bg-gray-100 rounded-×l p-10 border border-black/10'>
            <Link to="/" ><span className='absolute right-0  top-0 px-3 m-1 border-2 rounded-md    border-slate-900 hover:bg-slate-300' >X</span> </Link>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline" >
                    Sign Up
                </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
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