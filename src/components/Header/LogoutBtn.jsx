import React from "react";
import authServices from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";


function LogoutBtn(){
    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        authServices.userLogout()
        .then(()=> dispatch(logout()))
        .catch((error) => console.log("error while logout: ", error))
    }
    return <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={logoutHandler}>Logout</button>;
};

export default LogoutBtn;