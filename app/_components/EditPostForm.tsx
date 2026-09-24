"use client"
import React, { useActionState, useEffect } from 'react'
import { InitialStateType } from '../types'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { editPostAction } from '../actions/postActions'

const initailState:InitialStateType = {
    error:"",
    success:false
}


const EditPostForm = ({title,content,authorId,id}:{title:string,content:string,authorId:number,id:string}) => {
  const [state, formAction, isPending] = useActionState(editPostAction, initailState)
    const router = useRouter()
    useEffect(()=>{
        if(state.success){
             toast.success('Post edited!', {
                position: 'top-right',
            });
            router.push('/dashboard')
        }
    },[state,router])

  return (
    <form action={formAction} className="card-body">
        <input hidden type='number' name='authorId' defaultValue={authorId}/>
        <input hidden type='number' name='id' defaultValue={id}/>
          <label className="label">Title</label>
          <input type="text" name='title' className="input bg-background-fade w-full" placeholder="Title" defaultValue={title}/>
          <label className="label">Content</label>
          <textarea name='content' className="input bg-background-fade w-full min-h-50" placeholder="Content" defaultValue={content} />
          {state.error && <p className='text-red-700 text-center mt-4 '>{state.error}</p>}
          <button type='submit' className="btn btn-primary mt-4">{isPending?'Editing...':"Edit Post"}</button>
      </form>
  )
}

export default EditPostForm