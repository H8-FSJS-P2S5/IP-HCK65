import { useEffect, useState } from "react";
import Axios from "../helpers/axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CardHorizontal from "../components/card-horizontal";
import { errorHandler } from "../helpers/errorHandler";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  let navigate = useNavigate();

  const [animesList, setAnimesList] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });

  const [pagination, setPagination] = useState({
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    totalPages: 1,
  });

  const fetchDataMyAnime = async () => {
    try {
      // console.log("MASUK FETCH")
      const { page, pageSize } = params;
      let { data } = await Axios.get("myanime/", {
        params: { page, pageSize },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setAnimesList(data.animes);

      setPagination(data.pagination);
    } catch (error) {
      errorHandler(error);
      errorHandler;
    }
  };

  const handleRemoveFilter = (e) => {
    setParams((prevValue) => ({
      ...prevValue,
      page: 1,
      pageSize: 10,
    }));
  };

  const handlePage = (e) => {
    setParams((prevValue) => ({
      ...prevValue,
      page: e.target.value,
    }));
  };

  const handleShowDetail = async (event) => {
    try {
      // console.log("SINI", event.target.value)
      navigate(`/anime/${event.target.value}`);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleOnDelete = async (rating) => {
    try {
      // console.log(rating);
      const { data } = await Axios({
        url: `myanime/delete/${rating}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      toast.success(data.message);
      fetchDataMyAnime();
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    fetchDataMyAnime();
  }, [params]);

  // console.log(animesList,"ANILIST");
  // console.log(params,"PARAMS");
  // console.log(pagination, "PAGINASI");

  return (
    <>
      <section>
        <h1 className="flex justify-center text-4xl my-4">My Anime</h1>
        <div className="flex flex-col gap-4 mx-4">
          {animesList.map((anime) => {
            return (
              <CardHorizontal
                key={anime.id}
                anime={anime}
                fetchDataMyAnime={fetchDataMyAnime}
                handleOnDelete={handleOnDelete}
                handleShowDetail={handleShowDetail}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
