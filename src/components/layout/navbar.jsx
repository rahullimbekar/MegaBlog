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
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </a>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <ul>
                        {navItems.map((item) =>

                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.href)}
                                    > {item.name} </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (<li><SignOutBtn/></li>)}
                    </ul>
                    {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div> */}
                </div>
            </nav>
        </header>
    )
}

export default Navbar
