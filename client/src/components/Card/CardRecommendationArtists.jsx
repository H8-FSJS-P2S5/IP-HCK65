import { FaPlay } from 'react-icons/fa'
import './card.css'
import Axios from "axios"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CardRecommendationArtists() {
    let [artists, setArtists] = useState([]);

    const fetchArtists = async () => {
        try {
            // const response = await Axios.get('https://api.rafizuaf.online/users/reccommendByArtists', {
            const response = await Axios.get('http://localhost:3000/users/reccommendByArtists', {
                headers: {
                    Authorization: `${localStorage.getItem('access_token')}`
                }
            });
            setArtists(response.data);
            let getArtists = response.data
            await sendTracksUris(getArtists)
        } catch (error) {
            console.log(error);
        }
    }

    const sendTracksUris = async (artists) => {
        try {
            if (artists.length > 0) {
                setArtists(artists)
                const track_uris = artists.map((track) => track.trackUri);

                console.log(track_uris);
                await new Promise(resolve => setTimeout(resolve, 1000));

                // await Axios.post('https://api.rafizuaf.online/users/addTracks', track_uris, {
                await Axios.post('http://localhost:3000/users/addTracks', track_uris, {
                    headers: {
                        Authorization: `${localStorage.getItem('access_token')}`
                    }
                });

                toast.success('Playlist added to your profile.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                throw { name: "BadRequest", message: "No tracks provided" };
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        await fetchArtists();
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="tertiaryBg px-4 py-4 ml-4 rounded-bl-lg">
                <div className="flex justify-between ml-4 items-center mx-4 my-4">
                    <div className="grid grid-cols-5 gap-6">
                        {artists.map((track) => (
                            <div key={track.id} className="card col-span-1 p-4 rounded-lg">
                                <div className='relative'>
                                    <a href={track.trackUrl} target="_blank">
                                        <img src={track.albumImg} alt="" />
                                    </a>
                                    <button className='playBtn flex items-center rounded-[50%] bg-primary justify-center p-3 absolute bottom-0 right-0'>
                                        <FaPlay className='text-black' />
                                    </button>
                                </div>
                                <h3 className="font-semibold my-2">{track.songTitle}</h3>
                                <p className='text-xs text-white/25 leading-4'>{track.artist}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
