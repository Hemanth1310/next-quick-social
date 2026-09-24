"use client"

import React, { useActionState, useEffect } from 'react'
import { InitialStateType } from '../types'
import { loginAction, registerAction } from '../actions/authActions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Link from 'next/link'

const initailState:InitialStateType = {
    error:"",
    success:false
}

const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerAction, initailState)
    const router = useRouter()
    useEffect(()=>{
        if(state.success){
             toast.success('SignUp Successful', {
                position: 'top-right',
            });
            router.push('/login')
        }
    },[state,router])

  return (
    <form action={formAction} className="card-body">
          <label className="label">Email</label>
          <input type="email" name='email' className="input bg-background-fade w-full" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name='password' className="input bg-background-fade w-full" placeholder="Password" />
           <label className="label">Name</label>
          <input type="text" name='name' className="input bg-background-fade w-full" placeholder="Name" />
          {state.error && <p className='text-red-700 text-center mt-4'>{state.error}</p>}
          <button type='submit' className="btn btn-primary mt-4">{isPending?'Signing Up...':"Sign up"}</button>
          <div>Aready a user? <Link href='/login' className="link link-hover text-blue-700">Login here!</Link></div>
      </form>
  )
}

export default RegisterForm