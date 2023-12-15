import { FaPlay } from 'react-icons/fa'
import './card.css'
import Axios from "axios"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function CardRecommendationTracks() {
    let [tracks, setTracks] = useState([]);

    const fetchTracks = async () => {
        try {
            const response = await Axios.get('https://api.rafizuaf.online/users/reccommendByTracks', {
                headers: {
                    Authorization: `${localStorage.getItem('access_token')}`
                }
            });
            let getTracks = response.data
            await sendTracksUris(getTracks)
        } catch (error) {
            console.log(error);
        }
    }

    const sendTracksUris = async (tracks) => {
        try {
            if (tracks.length > 0) {
                setTracks(tracks)
                const track_uris = tracks.map((track) => track.uri);

                console.log(track_uris);

                await Axios.post('https://api.rafizuaf.online/users/addTracks', track_uris, {
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
        await fetchTracks();
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
                    </div>
                </div>
            </div>
        </>
    )
}