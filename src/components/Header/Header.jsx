import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link, useNavigate } from 'react-router-dom';
import {Logo, LogoutBtn} from "../index"
import logo from "../../assests/blog-logo.png"

const Header = ({className}) => {
  const navigate = useNavigate()
  const authStatus=useSelector((state) => state.auth.status)
  const userData=useSelector((state) => state.auth.userData)
  const navItem = [
    {
      name:'Home',
      slug:"/",
      active:true
    },
    {
      name:"Login",
      slug:"/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
  return (
    <header className={`${className} py-1 shadow bg-black text-white`}>
      <div className='px-10'>
        <nav className='flex'>
          <div className='mr-2 '>
            <Link to="/">
              <Logo logo={logo} className={"w-28 h-12"}/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {
              navItem.map((item) =>
              item.active ? (<li key={item.name}>
                <button 
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full'
                onClick={()=> navigate(item.slug)}>{item.name}</button>
              </li>)
              :null)
            }
            {
              authStatus && (
              
                <li>
                  <LogoutBtn />
                  
                </li>
              )

            }
            {
              userData && (
                <li>
                  <button 
                className='inline-bock px-3 py-2 duration-200 hover:bg-blue-100 hover:text-green-500 rounded-sm'
                >{userData.name}</button>
                  </li>  
              )
            }
          
          </ul>
        </nav>
      </div>
    </header>
  )
};

export default Header;