import CreatePostForm from '@/app/_components/CreatePostForm'
import EditPostForm from '@/app/_components/EditPostForm'
import prisma from '@/app/_lib/prisma'
import { getSession } from '@/app/_lib/sessions'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

const EditPost = async({params}:{params:Promise<{id:string}>}) => {
    const user = await getSession()
    
        if(!user){
            redirect('/login')
        }
    const {id} = await params
    const post =  await prisma.post.findUnique({
        where:{id:Number(id)}
    })

    if(!post){
        notFound()
    }
  return (
    <div className="hero-content w-full flex-col">
        <h1 className="text-2xl font-bold">Create New Post</h1>
        <div className="card w-full max-w-md shrink-0 shadow-2xl">
            <EditPostForm title={post.title} content={post.content} authorId={post.authorId} id={id}/>
        </div>
  </div>
  )
}

export default EditPost