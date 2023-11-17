import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {Loader} from "../index"

export default function AuthLayout ({children, authentication="true"}) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);
    useEffect(() => {
        if (authentication && authStatus!== authentication) {
            navigate("/signin");
        }else if 
            (!authentication && authStatus!== authentication){
                navigate("/");
        }
        setLoader(false)
    },[authStatus, navigate, authentication])
    return loader ? <Loader/>:<> {children} </>

}
