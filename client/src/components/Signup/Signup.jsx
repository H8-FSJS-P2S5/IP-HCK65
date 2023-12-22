import { Link } from 'react-router-dom'
import './signup.css'

export default function Signup () {
    return (
        <>
            <header className="px-12 bg-white">
                <div className="logo">
                <Link to='/'>
                    <img src="https://i.ibb.co/3fgM9W2/logo.png" width={120} alt="Pitch+" />
                </Link>
                </div>
            </header>
            <div className='bg-white py-10'>
                <div className='text-center w-1/2 mx-auto'>
                    <h1 className='text-5xl font-semibold my-12 text-black'>Sign up to start using Pitch+</h1>

                    <div className='border-b border-gray-400 w-3/4 my-4 mx-auto'>
                    </div>
                    <form className='text-center mx-auto w-1/2'>
                        {/* email */}
                        <div className='w-full text-left py-4'>
                            <label htmlFor="email" className='mb-2 inline-block text-black'>Email address</label>
                            <input
                                type="email"
                                placeholder='name@domain.com'
                                id='email'
                                name='email'
                                className='bg-[#121212]
                                    focus:bg-[#121212]
                                    block 
                                    w-full 
                                    rounded-md 
                                    border-0 
                                    text-gray-300 
                                    shadow-sm 
                                    ring-1 focus:ring-[3px]
                                    ring-inset focus:ring-inset
                                    ring-gray-300 focus:ring-gray-600 hover:ring-white
                                    placeholder:text-gray-400 
                                    p-3
                                    outline-none' />
                        </div>
                        {/* password */}
                        <div className='w-full text-left py-4'>
                            <label htmlFor="password" className='mb-2 inline-block text-black'>Password</label>
                            <input
                                type="password"
                                placeholder='Password'
                                id='password'
                                name='password'
                                className='bg-[#121212] 
                                    block 
                                    w-full
                                    rounded-md 
                                    border-0 
                                    text-gray-300 
                                    shadow-sm 
                                    ring-1 focus:ring-[3px]
                                    ring-inset focus:ring-inset
                                    ring-gray-300 focus:ring-gray-600 hover:ring-white
                                    placeholder:text-gray-400 
                                    p-3
                                    outline-none' />
                        </div>
                        {/* login btn */}
                        <div className='w-full text-left py-4'>
                            <input
                                type="type"
                                placeholder='Password'
                                value='Sign up'
                                className='bg-primary
                                    block 
                                    w-full
                                    p-3
                                    hover:scale-105
                                    translate-all 
                                    duration-300 
                                    text-black 
                                    font-semibold hover:font-bold 
                                    text-center rounded-full
                                    outline-none' />
                        </div>
                        {/* forgot */}
                        <div className='w-full text-center py-4'>
                            <Link to='/password/forget' className='text-black font-semibold underline mx-auto'>Forgot your password?</Link>
                        </div>
                    </form>

                    <div className='border-t border-gray-400 w-3/4 my-4 mx-auto h-full'>
                        <p className=' pt-8'>
                            <spa className='text-gray-400'>
                            Already have an account? 
                            </spa>
                            <Link to='/login' className='text-black hover:text-primary font-semibold underline mx-auto'> Log in to your account</Link>
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}