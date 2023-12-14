import { FaPlay } from 'react-icons/fa'
import './card.css'
import Axios from "axios"
import { useEffect, useState } from "react"

export default function CardArtists() {
    const [artists, setArtists] = useState([])

    const fetchArtists = async () => {
        try {
            const response = await Axios.get('http://localhost:3000/users/topArtists', {
                headers: {
                    Authorization: `${localStorage.getItem('access_token')}`
                }
            })
            // console.log(response.data.items);
            setArtists(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    
    // console.log(artists);
    useEffect (() => {
        fetchArtists()
    }, []) 
    return (
        <>
        {artists.map((artist) => (
        <div key={artist.id} className="card col-span-1 p-4 rounded-lg">
            <div className='relative'>
            
            <a href={artist.external_urls.spotify} target="_blank">

            <img className='h-52 w-56 object-cover ' src={artist.images[0].url} alt="" />
            </a>
            
            </div>
            <h3 className="font-semibold my-2">{artist.name}</h3>
            <p className='text-xs text-white/25 leading-4'>Artist</p>
        </div>
        ))}
        </>
    )
}