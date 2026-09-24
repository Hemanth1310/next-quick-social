import React from 'react'
import { getSession } from '../_lib/sessions'
import { UserFormatted } from '../types'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

const Navbar = async() => {
    const user:UserFormatted|null = await getSession()
  return (
    <div className="navbar bg-foreground shadow-sm text-content-white">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">QuickSocial</a>
        </div>
        <div className="flex-none">
            {user?  
                <ul className="menu menu-horizontal px-1 space-x-3">
                    <li><Link className='btn btn-sm sm:btn-md btn-ghost hover:bg-mist-700' href='/posts/create'>Create Post</Link></li>
                    <li><Link className='btn btn-sm sm:btn-md btn-ghost hover:bg-mist-700' href='/posts'>My Posts</Link></li>
                    <li> <LogoutButton/></li>
                
                </ul>:<ul className="menu menu-horizontal px-1 space-x-3">
                    <li><Link className='btn btn-sm sm:btn-md btn-ghost hover:bg-mist-700' href='/login'>Login</Link></li>
                    <li><Link className='btn btn-sm sm:btn-md btn-ghost hover:bg-mist-700' href='/register'>Sign Up</Link></li>
                </ul>

            }
            
        </div>
        </div>
  )
}

export default Navbar