import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <div className='flex flex-col justify-center items-center h-[100vh] gap-2 bg-primary-dark text-pink'>
                <h1>HOME</h1>
                <p>Welcome to my private universe guys, have fun!</p>
                <div className='flex gap-4'>
                    <Link className='p-2 bg-emerald-500 rounded-md px-4 font-semibold' to={'/login'}>Login</Link>
                    <Link className='p-2 bg-rose-500 rounded-md px-4 font-semibold' to={'/register'}>Register</Link>
                </div>
            </div>
        </>
    )
}

export default Home