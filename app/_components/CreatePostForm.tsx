"use client"
import React, { useActionState, useEffect } from 'react'
import { createPostAction } from '../actions/postActions'
import { InitialStateType } from '../types'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Link from 'next/link'

const initailState:InitialStateType = {
    error:"",
    success:false
}


const CreatePostForm = () => {
  const [state, formAction, isPending] = useActionState(createPostAction, initailState)
    const router = useRouter()
    useEffect(()=>{
        if(state.success){
             toast.success('Post created!', {
                position: 'top-right',
            });
            router.push('/dashboard')
        }
    },[state,router])

  return (
    <form action={formAction} className="card-body">
          <label className="label">Title</label>
          <input type="text" name='title' className="input bg-background-fade w-full" placeholder="Title" />
          <label className="label">Content</label>
          <textarea name='content' className="input bg-background-fade w-full min-h-50" placeholder="Content" />
          {state.error && <p className='text-red-700 text-center mt-4 '>{state.error}</p>}
          <button type='submit' className="btn btn-primary mt-4">{isPending?'Posting...':"Post"}</button>
      </form>
  )
}

export default CreatePostForm