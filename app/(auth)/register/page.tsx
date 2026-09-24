import RegisterForm from '@/app/_components/RegisterForm'
import React from 'react'

const Login = () => {
  return (
    <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card w-full max-w-sm shrink-0 shadow-2xl">
      <RegisterForm/>
    </div>
  </div>
  )
}

export default Login