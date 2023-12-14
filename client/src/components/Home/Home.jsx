import Layout from "../../layout/Layout";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CardTracks from "../Card/CardTracks";
import { Link } from "react-router-dom";
import CardArtists from "../Card/CardArtists";
import LogoutButton from "../../buttons/LogoutBtn";
export default function Home() {
    let isLoggedIn = localStorage.access_token

    return (
        <>
            <div className="flex justify-between ml-4 items-center mx-4 my-4">

                <div className="flex gap-2 items-center">
                    <span>
                        <FaChevronLeft className="bg-white/10 text-3xl p-2 rounded-[50%]" />
                    </span>
                    <span>
                        <FaChevronRight className="bg-white/10 text-3xl p-2 rounded-[50%]" />
                    </span>
                </div>

                <div>
                    { isLoggedIn ? <LogoutButton /> :
                        <div>
                            <Link to={'/signup'} className="rounded-full text-base text-white mt-4 px-8 py-0 font-semibold hover:scale-105 duration-300">
                                Sign up
                            </Link>
                            <Link to={'/login'} className="rounded-full text-base text-black mt-4 px-8 py-2 bg-primary font-semibold hover:scale-105 duration-300">
                                Log in
                            </Link>
                        </div>
                    }
                </div>
            </div>

            {/*  */}
            <div className="tertiaryBg px-4 py-4 ml-4 rounded-tl-lg">
                <div className="flex justify-between items-center my-4">
                    <span className="text-xl font-bold hover:underline duration-300 cursor-pointer">Top Tracks</span>
                    <span>Show all</span>
                </div>
                <div className="grid grid-cols-5 gap-6">
                    <CardTracks />
                </div>
                <div>
                    <p className="text-xl font-bold mt-4">Get a playlist based on your top tracks!</p>
                    <Link to='/reccommend/by-tracks'>
                        <button className="bg-primary rounded-full p-3 mt-2 text-secondary hover:scale-105 duration-300 font-bold">Surprise me!</button>
                    </Link>
                </div>
                <div className="flex justify-between items-center my-4">
                    <span className="text-xl font-bold hover:underline duration-300 cursor-pointer">Top Artist</span>
                    <span>Show all</span>
                </div>
                <div className="grid grid-cols-5 gap-6">
                    <CardArtists />
                </div>
                <div>
                    <p className="text-xl font-bold mt-4">Get a playlist based on your top artists!</p>
                    <Link to='/reccommend/by-artists'>
                        <button className="bg-primary rounded-full p-3 mt-2 text-secondary hover:scale-105 duration-300 font-bold">Surprise me!</button>
                    </Link>
                </div>
            </div>
            {/*  */}
        </>
    )

}
