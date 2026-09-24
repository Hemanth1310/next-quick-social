"use client"
import React, { useTransition } from 'react'
import { logooutAction } from '../actions/authActions'

const LogoutButton = () => {
    const [isPending, startTransition] = useTransition()
   
    const  handleLogout=()=>{
        startTransition(async()=>{
            await logooutAction()
        })
    }
  return (
    <button onClick={handleLogout} className='btn btn-sm sm:btn-md btn-soft btn-error'>{isPending?"Logging out":"Logout"}</button>
  )
}

export default LogoutButton