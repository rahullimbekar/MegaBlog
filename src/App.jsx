import React,{useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from "../src/appwrite/auth";
import {signIn, signOut} from "./store/authSlice";
import { Outlet } from 'react-router';
import {Navbar, Loader, TextBox, SignUp, SignIn} from './components/index';
import config from './config/config';


function App() {

  console.log(config.appWriteProjectId);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(signIn({userData}))
      }else {
        dispatch(signOut())
      }
    })
    .finally(()=> setLoading(false))
  },[])
  

  return !loading? (
    <div className='min-h-screen flex flex-wrap content-between'>
      <SignUp/>
      <Outlet/>
    </div>
  ) : <Loader/>
}

export default App
