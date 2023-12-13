import Layout from "../../layout/Layout";
import { FaBackward, FaForward, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
export default function Home() {
    return <Layout>
        <div className="flex justify-between ml-4 items-center mb-2">
            <div className="flex gap-2 items-center">
                <span>
                    <FaChevronLeft className="bg-white/10 text-3xl p-2 rounded-[50%]"/>
                </span>
                <span>
                    <FaChevronRight className="bg-white/10 text-3xl p-2 rounded-[50%]"/>
                </span>
            </div>
            <div>
                <Link to={'/signup'} className="rounded-full text-base text-white mt-4 px-8 py-0 font-semibold">
                    Sign up
                </Link>
                <Link to={'/login'} className="rounded-full text-base text-black mt-4 px-8 py-1 bg-white font-semibold">
                    Log in
                </Link>
            </div>
        </div>
        {/*  */}
        <div className="tertiaryBg px-4 py-4 ml-4">
            <div className="flex justify-between items-center my-4">
                <span className="text-xl font-bold hover:underline duration-300 cursor-pointer">Focus</span>
                <span>Show all</span>
            </div>
            <div className="grid grid-cols-5 gap-6">
                <Card />
            </div>
        <div className="flex justify-between items-center my-4">
                <span className="text-xl font-bold hover:underline duration-300 cursor-pointer">Playlist</span>
                <span>Show all</span>
            </div>
            <div className="grid grid-cols-5 gap-6">
                <Card />
            </div>
        </div>
        {/*  */}
        
            
    </Layout>
}
