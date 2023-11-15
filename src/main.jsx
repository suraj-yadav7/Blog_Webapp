import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import {AuthLayout, Login,SignUp} from "../src/components/index.js"
import Home from "../src/pages/Home.jsx"
import Allpost from "./pages/Allpost.jsx"
import Addpost from "./pages/Addpost.jsx"
import Edit from "./pages/Edit.jsx"
import Post from "./pages/Post.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/login",
        element:
        (<AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
        )
      },
      {
        path:"/signup",
        element:
        (<AuthLayout authentication={false}>
          <SignUp />
        </AuthLayout>
        ),
      },
      {
        path:"/all-posts",
        element:
        (
          // only authentication means true if no value is provided
          <AuthLayout authentication >
            {" "}
            <Allpost />
          </AuthLayout>
        )
      },{
        path:"/add-post",
        element:
        (
          <AuthLayout authentication >
            {" "}
            <Addpost />
          </AuthLayout>
        )
      },
      {
        path:"/edit-post/:slug",
        element:
        (
          <AuthLayout authentication >
            {" "}
            <Edit  />
          </AuthLayout>
        )
      },
      {
        path:"/post/:slug",
        element:
            <Post />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
)
