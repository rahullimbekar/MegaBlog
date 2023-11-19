import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {AuthLayout, Navbar} from "./components/index.js";

import SignUp from "./view/signUp.jsx";
import SignIn  from "./view/signIn.jsx";
import AddPost from "./view/addPost.jsx";
import AllPost from "./view/allPost.jsx";
import Post from "./view/post.jsx";
import UpdatePost from "./view/updatePost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children: [
      {
        path:"/",
        element:<AllPost/>,
      },
      {
        path:"/signin",
        element:(
          <AuthLayout authentication={false}>
            <SignIn/>
          </AuthLayout>
        ),
      },
      {
        path:"/signup",
        element :(
          <AuthLayout authentication={false}>
            <SignUp/>
          </AuthLayout>
        ),
      },
      {
        path:"/add-post",
        element:(
          <AuthLayout authentication>
            {""}
            <Navbar/>
            <AddPost/>
          </AuthLayout>
        ),
      },
      {
        path:"/all-post",
        element:(
          <AuthLayout authentication>
            {""}
            <Navbar/>
            <AllPost/>
          </AuthLayout>
        ),
      },
      {
        path:"/update-post/:slug",
        element:(
          <AuthLayout authentication>
            {""}
            <Navbar/>
            <UpdatePost/>
          </AuthLayout>
        ),
      },
      {
        path:"/post/:slug",
        element: <Post/>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
