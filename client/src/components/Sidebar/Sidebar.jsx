import { BiSolidHome } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { LuLibrary } from "react-icons/lu";
import { TfiWorld } from "react-icons/tfi";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export default function Sidebar() {
    return (
        <>
            <div className="w-1/4 hidden xl:block sm:fixed left-0 top-0 sidebar">
                {/* Nav Home & Search */}
                <div id="home" className="secondaryBg rounded-lg p-6">
                    <div className="flex items-center gap-4 hover:text-white text-white/50 duration-300">
                        <Link to='/'><BiSolidHome className="font-bold text-xl " /></Link>
                        <Link to='/' className='font-bold'>Home</Link>
                        {/* <span className="hover:text-white text-white/50 font-bold duration-300">Home</span> */}
                    </div>
                    <Link to='/profile'>
                        <div className="flex mt-4 items-center gap-4 hover:text-white text-white/50 duration-300">
                            <BsPersonCircle className="font-bold text-xl" />
                            <span className="hover:text-white text-white/50 font-bold duration-300">My Profile</span>
                        </div>
                    </Link>
                </div>
                {/* Nav Your Lib */}
                <div id="your-library" className="mt-4 secondaryBg rounded-lg px-6 py-2 h-screen">
                    <div className="flex justify-between mb-4 items-center gap-4">
                        <div className="flex gap-4 items-center">
                            <LuLibrary className="font-bold text-xl" />
                            <span className="hover:text-white text-white/50 font-bold duration-300">Your Library</span>
                        </div>
                        <button className="hover:bg-black/25 rounded-[50%] p-2 hover:text-white text-white/25 font-bold duration-300">
                            <FaPlus className="font-bold text-xl" />
                        </button>
                    </div>
                    {/* Playlists bar */}
                    <div id="sidebar-overflow" className="h-96">
                        <div className="leading-7 tertiaryBg rounded-lg p-6">
                            <p className="font-bold">Create your first playlist</p>
                            <p className="font-semibold">It's easy, we'll help you</p>
                            <button className="rounded-full text-black mt-4 px-4 py-1 bg-white font-semibold">
                                Create playlist
                            </button>
                        </div>
                        {/* Podcasts bar */}
                        
                        <div className="leading-7 tertiaryBg rounded-lg p-6 mt-4">
                            <p className="font-bold">Let's find some podcast to follow</p>
                            <p className="font-semibold">We'll keep you updated on new episode</p>
                            <button className="rounded-full text-black mt-4 px-4 py-1 bg-white font-semibold">
                                Browse podcast
                            </button>
                        </div>
                    </div>
                    <div className="absolute bottom-40 left-5">

                    <div className="mt-4 -mx-3 flex flex-wrap">
                        <a className='text-xs text-gray-300 mx-4' href="#">Legal</a>
                        <a className='text-xs text-gray-300 mx-4' href="#">Blabla</a>
                        <a className='text-xs text-gray-300 mx-4' href="#">Blublu</a>
                        <a className='text-xs text-gray-300 mx-4' href="#">Zazu</a>
                    </div>
                    <button className="mt-4 items-center hover:border-white border-white/25 border rounded-full flex gap-2 hover:bg-black/25 px-3 py-2 hover:text-white text-white/25 font-bold duration-300">
                        <TfiWorld />
                        <span className="font-bold">Language</span>
                    </button>
                        </div>
                </div>
                {localStorage.access_token ? '' : <Footer />}

                {/*  */}



            </div>
        </>

    )
}