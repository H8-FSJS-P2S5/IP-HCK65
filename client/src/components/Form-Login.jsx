import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Axios from "axios"
import {toast } from 'react-toastify';
export default function FormLogin() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    
    const navigate = useNavigate()
    const handleCredentialResponse = async (response) => {
        const google_token = response.credential
        const {data} = await Axios.post("http://localhost:3000/users/google-login", {google_token : google_token})
        localStorage.setItem('access_token', data.access_token)
        toast.success('Login Success!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            navigate('/welcome')

    }

    useEffect(()=> {
        window.google.accounts.id.initialize({
            client_id : '577093868412-ett3klbphkmh0224md3pabuigg0plh32.apps.googleusercontent.com',
            callback : handleCredentialResponse
        })
        window.google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            {theme : "outline", size: 'large'}
        )
    }, [])
    // console.log(form);
    const handleOnSubmit = async (event) => {
        event.preventDefault()

        try {
            const { data } = await Axios.post("http://localhost:3000/users/login", form)
            localStorage.setItem("access_token", data.access_token)
            toast.success('Login Success!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            navigate('/welcome')

        } catch (error) {
            // console.log(error);
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r bg-black shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <form className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20" onSubmit={handleOnSubmit}>
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Login</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={form.email}
                                            onChange={(event) => {
                                                setForm((prevForm) => {
                                                    return {
                                                        ...prevForm,
                                                        email: event.target.value
                                                    }
                                                })
                                            }}
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                        <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="password"
                                            value={form.password}
                                            onChange={(event) => {
                                                setForm((prevForm) => {
                                                    return {
                                                        ...prevForm,
                                                        password: event.target.value
                                                    }
                                                })
                                            }}
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div className="relative">
                                        <button
                                            className="select-none rounded-lg bg-black py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            type="submit">
                                            Login
                                        </button>
                                    </div>
                                    <p>Don’t have an account yet? <Link to='/register'><span className=" hover:text-blue-800 ">Sign In</span></Link></p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                    
                                <div id="buttonDiv"></div>
                        </div>

                    </form>
                </div>
            </div>

        </>
    )
}