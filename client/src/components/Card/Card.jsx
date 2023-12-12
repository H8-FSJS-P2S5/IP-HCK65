import { FaPlay } from 'react-icons/fa'
import './card.css'

export default function Card() {
    return (
        <div className="card col-span-1 p-4 rounded-lg">
            <div className='relative'>
            <img src="/src/assets/cover.jpg" alt="" />
            <button className='playBtn flex items-center rounded-[50%] bg-primary justify-center p-3 absolute bottom-0 right-0'>
                <FaPlay className='text-black' />
            </button>
            </div>
            <h3 className="font-semibold my-2">Title</h3>
            <p className='text-xs text-white/25 leading-4'>Desciption</p>
        </div>
    )
}