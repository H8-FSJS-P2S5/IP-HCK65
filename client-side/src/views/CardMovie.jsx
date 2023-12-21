import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CardMovie() {
  const [detailMovie, setDetailMovie] = useState([]);

  // const fetchDetailMovie = async () => {
  //   try {
  //     const response = await axios({
  //       method: "get",
  //       url: "https://imdb-top-100-movies1.p.rapidapi.com/",
  //       headers: {
  //         "X-RapidAPI-Key": `864ff3300fmshcf160a65dec8800p122df3jsn3e75fb70c1a1`,
  //         "X-RapidAPI-Host": "imdb-top-100-movies1.p.rapidapi.com"
  //       },
  //     });
  //     console.log(response.data, ">>>>>>");
  //     setDetailMovie(response.data)

  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // };

  const fetchDetailMovie = async () => {
    try {
      const response = await axios.get("http://localhost:3000/movie", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response.data, ">>>>>>");
      setDetailMovie(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  // console.log(fetchDetailMovie);

  useEffect(() => {
    fetchDetailMovie();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center m-3">
        {detailMovie.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-72 md:w-96 lg:w-80 xl:w-96 cursor-pointer rounded-lg bg-white p-2 m-2 shadow duration-150 hover:scale-105 hover:shadow-md"
          >
            <img
              className="w-full h-auto rounded-lg object-cover object-center"
              src={item.images}
              alt="movie"
            />
            <p className="font-bold text-black font-serif m-2">{item.title}</p>
            <p className="text-black font-serif m-2">
              {" "}
              Cast
              <strong /> : {item.Stars}
            </p>
            <p className="font-semibold text-black font-mono m-2">
              {item.description}
            </p>
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <Link to={`/movie/review/${item.id}`}>Review</Link>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default CardMovie;
