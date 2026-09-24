import { cookies } from "next/headers";
import { User } from "../generated/prisma/browser";


export async function getSession(){
    const user = (await cookies()).get('session')?.value

    if(!user){
        return null
    }
    return JSON.parse(user)
}

export async function setSession(user:User){
    const cookie = await cookies()
    const {password, ...rest} = user
    cookie.set('session',JSON.stringify(rest),{
        httpOnly:true,
        secure: process.env.NODE_ENV==="production",
        path:'/',
        maxAge: 7*24*60*60,
        
    })
}

export async function clearSession(){
      const cookie = await cookies()
      cookie.delete('session')
}