import { FaPlay } from 'react-icons/fa'
import './card.css'
import Axios from "axios"
import { useEffect, useState } from "react"


export default function CardReccomendationTracks() {
    const [tracks, setTracks] = useState([])

    const fetchTracks = async () => {
        try {
            const response = await Axios.get('http://localhost:3000/users/reccomendByTracks', {
                headers: {
                    Authorization: `${localStorage.getItem('access_token')}`
                }
            })
            // console.log(response.data);
            setTracks(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(tracks);

    useEffect(() => {
        fetchTracks()
    }, [])
    return (
        <>
            {tracks.map((track) => (
                <div key={track.id} className="card col-span-1 p-4 rounded-lg">
                    <div className='relative'>
                        <a href={track.external_urls.spotify} target="_blank">
                            <img src={track.album.images[0].url} alt="" />
                        </a>
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