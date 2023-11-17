import React from 'react'
import SignOutBtn from './signOutBtn';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom'

function Navbar() {

    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name:"Home",
            href:"/",
            active:true
        },
        {
            name:"All Post",
            href:"/all-post",
            active:authStatus,
        },
        {
            name:"Add Post",
            href:"/add-post",
            active:authStatus,
        },
        {
            name : "Sign In", 
            href:"/signin", 
            active:!authStatus,
        },
        {
            name: "Sign Up", 
            href:"/signup",
            active:!authStatus,
        },
        {
            name:"About",
            href:"#",
        },
        {
            name:"Contact",
            href:"#",
        },
    ]
    

    return (
        <header className="relative w-full border-b bg-white pb-4">
            
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                
                                {navItems.map((item) =>

                                    item.active ? (
                                        <li key={item.name} className='list-none'>
                                            <button
                                                onClick={() => navigate(item.href)}
                                            > {item.name} </button>
                                        </li>
                                    ) : null
                                )}                               
                            </div>
                        </div>
                    </div>
                    
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        {authStatus && (<SignOutBtn/>)}
                    </div>
                </div>
            </div>
        </header>
        
    )
}

export default Navbar
