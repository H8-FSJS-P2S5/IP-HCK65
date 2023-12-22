import { Link, useNavigate } from "react-router-dom"
import Axios from 'axios'
import { useEffect, useState } from "react"
import {toast } from 'react-toastify';


export default function FormUpdate() {
    let [form, setForm] = useState()
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    const handleUpdate = async (event) => {
        event.preventDefault()
        try {
            await Axios.put('http://localhost:3000/users', form, {
                headers : {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            toast.success('Update Profile Success!', {
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
            console.log(error);
        }
    }

    const fetchData = async () => {
        try {
            let {data} = await Axios.get(`http://localhost:3000/users`, {
                headers : {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            // console.log(data.user);
            setUser(data.user)
        } catch (error) {
            console.log();
        }
    }

    useEffect( ()=> {
        fetchData()
    }, [])
    return (
        <>
             <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 w-full sm:max-w-xl sm:mx-auto">
                    <form className="relative px-4 py-10 bg-white mx-8 md:mx-auto shadow rounded-3xl sm:p-10 w-2xl" onSubmit={handleUpdate} >
                        <div className="max-w-md mx-auto">
                            <div className="flex justify-center items-center space-x-5">
                                <div className=" ml-6 flex flex-row gap-3">
                                    <svg className="w-6 h-6 text-black dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-black">Add New User</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="flex flex-col">
                                        <label className="leading-loose">fullName</label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            defaultValue={user.fullName}
                                            onChange={(event) => {
                                                return setForm((preForm) => {
                                                    return {
                                                        ...preForm,
                                                        fullName: event.target.value
                                                    }
                                                })
                                            }}

                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            placeholder="fullName" />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="leading-loose">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            defaultValue={user.email}
                                            onChange={(event) => {
                                                return setForm((prevFrom) => {
                                                    return {
                                                        ...prevFrom,
                                                        email: event.target.value
                                                    }
                                                })
                                            }}
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="leading-loose">Phone Number</label>
                                        <input
                                            type="text"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            defaultValue={user.phoneNumber}
                                            onChange={(event) => {
                                                return setForm((prevFrom)=>{
                                                    return {
                                                      ...prevFrom,
                                                        phoneNumber: event.target.value
                                                    }
                                                })
                                            }}
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            placeholder="Phone Numner"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            defaultValue={user.address}
                                            onChange={(event)=>{
                                                return setForm((prevFrom)=>{
                                                    return {
                                                     ...prevFrom,
                                                        address: event.target.value
                                                    }
                                                })
                                            }}
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            placeholder="Address"
                                        />
                                    </div>

                                </div>
                                <div className="pt-4 flex items-center space-x-4">
                                    <Link to="/welcome"> <button className=" bg-red-600 text-white flex justify-center items-center w-full px-4 py-3 rounded-md focus:outline-none">
                                        <svg
                                            className="w-6 h-6 mr-3"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>{" "}
                                        Cancel
                                    </button></Link>
                                    <button type="submit" className="bg-black text-white hover:bg-gray-900 border-black flex justify-center items-center w-full px-4 py-3 rounded-md focus:outline-none">
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>  
        </>
    )
}