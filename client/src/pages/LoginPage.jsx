import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
    return (
        <div className='mt-4 flex items-center grow justify-around'>
            <div className='mb-64'>
                <h1 className=' text-3xl text-center mb-10'>Login</h1>
                <form action="" className='max-w-md mx-auto'>
                    <input className='w-full border border-gray-400 rounded-2xl py-2 px-3 my-1' type="email" placeholder='your@gmail.com' />
                    <input className='w-full border border-gray-400 rounded-2xl py-2 px-3 my-1' type="password" placeholder='password' />
                    <button className='bg-primary text-white w-full p-2 rounded-2xl mt-5'>Login</button>
                </form>
                <div className='py-2 text-center text-gray-500'>
                    Don't have an Account yet? <Link to={'/register'} className='underline text-black'>Register now</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
