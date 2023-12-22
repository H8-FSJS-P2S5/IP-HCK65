import { LuLogIn } from "react-icons/lu";
import { RiUserShared2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
// import { MdLogin } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi"

export default function Navbar() {

    const isLogin = localStorage.getItem('access_token')
    return (
        <>
            <nav
                className=" bg-black w-full max-w-screen-xl px-6 py-3 mt-2 mx-auto text-white bg-border shadow-md rounded-xl border-white/80 backdrop-blur-2xl backdrop-saturate-200">
                <div className="flex items-center justify-between text-white">
                    <a href="#"
                        className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased">
                        Library of Programmer
                    </a>
                    <div className="hidden lg:block">
                        <ul className="flex flex-row gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                            <Link to="/dashboard">
                                {isLogin && (
                                    <div>
                                          <Link to='/login' className="flex items-center cursor-pointer py-2 px-3 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased transition duration-300 ease-in-out hover:bg-white hover:text-black rounded-md">
                                        <BiSolidDashboard className="mr-1" />
                                        Dashboard
                                    </Link>
                                    </div>
                                )}
                            </Link>

                            {!isLogin && (
                                <>
                                    <Link to="/register" className="flex items-center cursor-pointer py-2 px-3 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased transition duration-300 ease-in-out hover:bg-white hover:text-black rounded-md">
                                        <RiUserShared2Fill className="mr-1" />
                                        Sign Up
                                    </Link>

                                    <Link to='/login' className="flex items-center cursor-pointer py-2 px-3 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased transition duration-300 ease-in-out hover:bg-white hover:text-black rounded-md">
                                        <LuLogIn className="mr-1" />
                                        Login
                                    </Link>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}