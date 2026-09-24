"use server"

import { Prisma } from "@/app/generated/prisma/client"
import prisma from "../_lib/prisma"
import { clearSession, setSession } from "../_lib/sessions"
import { InitialStateType } from "../types"


export const loginAction=async(prevState:InitialStateType,formData:FormData)=>{
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if(!email ||!password){
         return{
                error:"One or more fields are empty",
                success:false
            }
    }

    try{
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user){
            return{
                error:"User not found",
                success:false
            }
        }
        if(user.password!==password){
             return{
                error:"Password incorrect",
                success:false
            }
        }
        await setSession(user)
        return{
            error:"",
            success:true
        }
    }catch{
        return {
            error:"Unexpected Error occured",
            success:false
        }
    }
} 


export const registerAction = async(prevState:InitialStateType,formData:FormData)=>{
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    if(!email ||!password ||!name){
         return{
                error:"One or more fields are empty",
                success:false
            }
    }

    try{
        await prisma.user.create({
            data:{
                email,
                password,
                name
            }
        })

        return{
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


export const logooutAction=async()=>{
    await clearSession()
}