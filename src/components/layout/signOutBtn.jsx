import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { signOut } from '../../store/authSlice'

function SignOutBtn() {

    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.signOut().then(()=>{dispatch(signOut)})
    }

    return (
        <button
            type="button"
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={logoutHandler}
        >
            Sign Out
        </button>
    )
}

export default SignOutBtn
