import CreatePostForm from '@/app/_components/CreatePostForm'
import { getSession } from '@/app/_lib/sessions'
import { redirect } from 'next/navigation'
import React from 'react'

const CreatePost = async() => {
  const user = await getSession()
  
      if(!user){
          redirect('/login')
      }
  return (
    <div className="hero-content w-full flex-col">
        <h1 className="text-2xl font-bold">Create New Post</h1>
        <div className="card w-full max-w-md shrink-0 shadow-2xl">
        <CreatePostForm/>
        </div>
  </div>
  )
}

export default CreatePost