"use client"

import React, { useActionState, useEffect } from 'react'
import { InitialStateType } from '../types'
import { loginAction } from '../actions/authActions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Link from 'next/link'

const initailState:InitialStateType = {
    error:"",
    success:false
}

const LoginForm = () => {
    const [state, formAction, isPending] = useActionState(loginAction, initailState)
    const router = useRouter()
    useEffect(()=>{
        if(state.success){
             toast.success('Login Successful', {
                position: 'top-right',
            });
            router.push('/dashboard')
        }
    },[state,router])

  return (
    <form action={formAction} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" name='email' className="input bg-background-fade w-full" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name='password' className="input bg-background-fade w-full" placeholder="Password" />
          {state.error && <p className='text-red-700 text-center mt-4'>{state.error}</p>}
          <button type='submit' className="btn btn-primary mt-4">{isPending?'Loggining in...':"Login"}</button>
          <div>Not a user? <Link href='/register' className="link link-hover text-blue-700">Sign Up here!</Link></div>
        </fieldset>
      </form>
  )
}

export default LoginForm