import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "../helpers/axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { errorHandler } from "../helpers/errorHandler";

export default function DetailAnimePage() {
  let navigate = useNavigate();
  let { id } = useParams();

  let [anime, setAnime] = useState([]);
  let fetchDetailAnime = async () => {
    try {
      let response = await Axios.get(`/animes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setAnime(response.data);
    } catch (error) {
      errorHandler(error);
    }
  };

  async function handleExit(event) {
    try {
      navigate("/");
    } catch (error) {
      errorHandler(error);
    }
  }

  useEffect(() => {
    fetchDetailAnime();
  }, []);

  // console.log(anime);

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content relative flex-col lg:flex-row">
          <button
            className="btn btn-ghost btn-circle btn-sm absolute top-4 right-2"
            onClick={handleExit}
          >
            X
          </button>
          <img src={anime.imgUrl} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{anime.title}</h1>
            <h2 className="text-5xl font-bold">{anime.titleJap}</h2>
            <p className="">Total Episodes : {anime.episodes}</p>
            <p className="">Status : {anime.status}</p>
            <p className="">Aired : {anime.aired}</p>
            <p className="text-justify">synopsis : {anime.synopsis}</p>
            <p className="">
              Producers : {anime.producers ? anime.producers : "-"}
            </p>
            <p className="">
              Licensors : {anime.licensors ? anime.licensors : "-"}
            </p>
            <p className="">Studio : {anime.studios ? anime.studios : "-"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
