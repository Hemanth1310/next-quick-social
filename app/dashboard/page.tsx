import { getSession } from '../_lib/sessions'
import { redirect } from 'next/navigation'
import prisma from '../_lib/prisma'


const Dashboard = async() => {
    const user = await getSession()

    if(!user){
        redirect('/login')
    }

    const posts = await prisma.post.findMany({
        include:{
            author:true
        }
    })

  return (
    <div className="hero-content flex flex-col">
        <h1 className='text-2xl font-bold'>Here are all the Updates</h1>
        {posts.map(post=><div key={post.id} className="card w-96 card-md shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <p className='text-left'>{post.content}</p>
                <div className=" card-actions">
                    -<p className='font-bold'>{post.author.name}</p>
                </div>
            </div>
            </div>)}
    </div>
  )
}

export default Dashboard