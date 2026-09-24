"use server"

import prisma from "../_lib/prisma"
import { getSession } from "../_lib/sessions"
import { Prisma } from "../generated/prisma/client"
import { InitialStateType } from "../types"

export const createPostAction = async(prevState:InitialStateType, formData:FormData) => {
    const user =await getSession()

    if(!user){
        return {
            error:"User not logged In",
            success:false
        }
    }

    const title = formData.get('title') as string
    const content = formData.get('content') as string

    try{
        await prisma.post.create({
            data:{
                title,
                content,
                authorId:user.id
            }
        })
        return {
            error:"",
            success:true
        }
    }catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // P2002 is the error code for "Unique constraint failed"
                if (error.code === 'P2002') {
                    const target = error.meta?.target // Array of fields that failed unique check
                    return { 
                        success: false, 
                        error: 'A user with this email already exists.' 
                    }
                }
            }
             return { 
                    success: false, 
                    error: 'Unexpected error occured' 
                }
        }

}


export const editPostAction = async(prevState:InitialStateType, formData:FormData) => {
    const user =await getSession()

    if(!user){
        return {
            error:"User not logged In",
            success:false
        }
    }
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const authorId = formData.get('authorId') as string
    const id = formData.get('id') as string

    if(!title || !content){
           return{
                error:"One or more fields are empty",
                success:false
            }
    }

    if(!authorId){
          return{
                error:"Session expired",
                success:false
            }
    }

    if(Number(authorId) !==user.id){
         return{
                error:"Unauthoried expired",
                success:false
            }
    }

    try{
        await prisma.post.update({
            data:{
                title,
                content,
            },
            where:{
                id:Number(id)
            }
        })
        return {
            error:"",
            success:true
        }
    }catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // P2002 is the error code for "Unique constraint failed"
                if (error.code === 'P2002') {
                    const target = error.meta?.target // Array of fields that failed unique check
                    return { 
                        success: false, 
                        error: 'A user with this email already exists.' 
                    }
                }
            }
             return { 
                    success: false, 
                    error: 'Unexpected error occured' 
                }
        }

}