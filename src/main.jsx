import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {AuthLayout, SignIn} from "./components/index.js";



const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children: [
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <SignIn/>
          </AuthLayout>
        ),
      },
    ],
  },])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
