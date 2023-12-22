import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './login.css'
import { useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


export default function Login() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    useEffect(() => {
        // console.log(searchParams.get('access_token'));
        if (searchParams.get('status') === 'success') {
            localStorage.access_token = searchParams.get('access_token');
            navigate('/')
        }
    }, [])
    return (
        <>
            <header className="px-12 header bg-black">
                <div className="logo">
                    <Link to='/'>
                        <img src="https://i.ibb.co/k3HYSg2/logowhite.png" width={120} alt="Pitch+" />
                    </Link>
                </div>
            </header>
            <div className='py-10'>
                <div className='bg-black text-center w-1/2 mx-auto'>
                    <h1 className='text-3xl md:text-5xl font-semibold my-12'>Log in to Pitch+</h1>

                    <div className='border-b border-gray-400 w-3/4 my-4 mx-auto'>
                    </div>
                    <form className='text-center mx-auto w-1/2'>
                        {/* login btn */}
                        <div className='w-full flex flex-col justify-center items-center gap-4'>
                            <GoogleLogin className='w-full text-center'
                                onSuccess={credentialResponse => {
                                    const credentialResponseDecoded = jwtDecode(credentialResponse.credential)
                                    console.log(credentialResponseDecoded);
                                    navigate('/spotifyAuth')
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                            <h1 className='text-2xl md:text-5xl'>or</h1>
                            {/* <a href="https://api.rafizuaf.online/auth/spotify/sign-in"  */}
                            <a href="http://localhost:3000/auth/spotify/sign-in"
                                className='bg-primary
                                    text-xs sm:text-sm md:text-md lg:text-lg
                                    block 
                                    w-full
                                    p-3
                                    hover:scale-105
                                    translate-all 
                                    duration-300 
                                    text-black 
                                    font-semibold hover:font-bold 
                                    text-center rounded-full
                                    outline-none'>Login with Spotify</a>
                        </div>
                        {/* forgot */}
                        <div className='w-full text-center py-4 text-xs sm:text-sm md:text-md lg:text-lg'>
                            <Link to='/password/forget' className='text-white font-semibold underline mx-auto'>Forgot your password?</Link>
                        </div>
                    </form>

                    <div className='border-t border-gray-400 w-3/4 my-4 mx-auto text-xs sm:text-sm md:text-md lg:text-lg'>
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