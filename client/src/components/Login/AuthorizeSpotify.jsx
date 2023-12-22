import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './login.css'
import { useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


export default function AuthorizeSpotify() {
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
                            
                            {/* <a href="https://api.rafizuaf.online/auth/spotify/sign-in"  */}
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
                                    outline-none'>Login with Spotify</a>

                    
                </div>

            </div>
        </>
    )
} 