import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { fetchMovies } from "../features/moviesSlice";
import { fetchDetailMovie } from "../features/actions";

function CardMovie() {
  // const [detailMovie, setDetailMovie] = useState([]);

  const dataMovieList = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();
  // console.log(dataMovieList, "cardmovie yaaa");

  useEffect(() => {
    dispatch(fetchDetailMovie());
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center m-3">
        {dataMovieList.map((item) => (
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
