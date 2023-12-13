import { FaPlay } from 'react-icons/fa'
import './card.css'
import Axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function Card() {
    const [tracks, setTracks] = useState([])

    const fetchTracks = async () => {
        try {
            const response = await Axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            // console.log(response.data.items);
            setTracks(response.data.items)
            console.log(tracks);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect (() => {
        fetchTracks()
    }, []) 
    return (
        <>
        {/* {tracks.map((track) => )} */}

        {tracks.map((track) => (

        <div key={track.external_urls.id} className="card col-span-1 p-4 rounded-lg">
            <div className='relative'>
            {/* <img src="/src/assets/cover.jpg" alt="" /> */}
            <img src={track.album.images[0].url} alt="" />
            <button className='playBtn flex items-center rounded-[50%] bg-primary justify-center p-3 absolute bottom-0 right-0'>
                <FaPlay className='text-black' />
            </button>
            </div>
            <h3 className="font-semibold my-2">{track.name}</h3>
            <p className='text-xs text-white/25 leading-4'>{track.artists[0].name}</p>
        </div>
        ))}
        </>
    )
}