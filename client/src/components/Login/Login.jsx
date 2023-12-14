import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './login.css'
import { useEffect } from 'react'

export default function Login() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    useEffect(() => {
        // console.log(searchParams.get('access_token'));
        if(searchParams.get('status') === 'success') {
            localStorage.access_token = searchParams.get('access_token');
            navigate('/')
        }
    }, [])
    return (
        <>
            <header className="px-12 header bg-black">
                <div className="logo">
                    <Link to='/'>
                    <img src="/src/assets/logowhite.png" width={120} alt="Pitch+" />
                    </Link>
                </div>
            </header>
            <div className='py-10'>
                <div className='bg-black text-center w-1/2 mx-auto'>
                    <h1 className='text-5xl font-semibold my-12'>Log in to Pitch+</h1>

                    <div className='border-b border-gray-400 w-3/4 my-4 mx-auto'>
                    </div>
                    <form className='text-center mx-auto w-1/2'>
                        {/* email */}
                        <div className='w-full text-left py-4'>
                            <label htmlFor="email" className='mb-2 inline-block'>Email or username</label>
                            <input
                                type="email"
                                placeholder='Email or username'
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
                            <label htmlFor="password" className='mb-2 inline-block'>Password</label>
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
                            <a href="http://localhost:3000/auth/spotify/sign-in" 
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
                                    outline-none'>Login</a>
                        </div>
                        {/* forgot */}
                        <div className='w-full text-center py-4'>
                            <Link to='/password/forget' className='text-white font-semibold underline mx-auto'>Forgot your password?</Link>
                        </div>
                    </form>

                    <div className='border-t border-gray-400 w-3/4 my-4 mx-auto'>
                        <p className=' pt-8'>
                            <span className='text-gray-400'>
                            Don't have an account? 
                            </span>
                            <Link to='/signup' className='text-white hover:text-primary font-semibold underline mx-auto'> Sign up for Pitch+</Link>
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
} 