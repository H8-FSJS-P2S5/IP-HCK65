import { MdOutlineLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
export default function NavbarUser() {

    const navigate = useNavigate()
    const hanldeLogout = () => {
        localStorage.removeItem('access_token')
        navigate('/')
    }

    return (
        <>
              <nav className="bg-black w-full max-w-screen-xl px-6 py-3 mt-2 mx-auto text-white bg-border shadow-md rounded-xl border-white/80 backdrop-blur-2xl backdrop-saturate-200">
                <div className="flex items-center justify-between text-white">
                    <Link to="/" className=" block cursor-pointer py-2 px-3 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased transition duration-300 ease-in-out hover:bg-white hover:text-black rounded-md">
                        Library of Programmer
                    </Link>
                    <div className="flex-grow flex items-center justify-center">
                        <Link to="/welcome" className="mx-4 block cursor-pointer py-2 px-3 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased transition duration-300 ease-in-out hover:bg-white hover:text-black rounded-md">
                            Home
                        </Link>
                        <Link to="/my-profile" className="mx-4 block cursor-pointer py-2 px-3 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased transition duration-300 ease-in-out hover:bg-white hover:text-black rounded-md">
                            My Profile
                        </Link>
                        <Link to="/dashboard" className="mx-4 block cursor-pointer py-2 px-3 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased transition duration-300 ease-in-out hover:bg-white hover:text-black rounded-md">
                            My Reading List
                        </Link>
                    </div>
                    <div className="hidden lg:block">
                        <ul className="flex flex-row gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-white">
                                <button type="button" onClick={hanldeLogout} className="flex items-center transition-colorsmx-4 cursor-pointer py-2 px-3 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased transition duration-300 ease-in-out hover:bg-white hover:text-black rounded-md">
                                    <MdOutlineLogout className="mr-1" />
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            

        </>
    )
}