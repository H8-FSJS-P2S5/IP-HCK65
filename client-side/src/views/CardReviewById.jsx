import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import DataReview from "./DataReview";

function CardReview() {
  const { id } = useParams();
  const [detailReview, setDetailReview] = useState();

  const fetchDetailReview = async () => {
    try {
      console.log("masuk");
      const response = await axios.get(
        `http://localhost:3000/movie/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      // console.log(response.data, "card review");
      setDetailReview(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchDetailReview();
  }, [id]);

  return (
    <>
      <div className="container-review m-10">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img src={detailReview?.images} alt="Album" />
          </figure>
          <div className="card-body">
            <h2 className="card-title" style={{ fontFamily: "Helvetica" }}>
              {detailReview?.title} - {detailReview?.year}
            </h2>

            <p>
              {" "}
              <strong>Cast </strong> : {detailReview?.Stars}
            </p>
            <p>{detailReview?.description}</p>
            <div className="card-actions justify-end">
              <button
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <Link to={`/movie/add/review/${id}`}>Add Review</Link>
              </button>
              {/* <button
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <Link to={`/movie/detail/review/${id}`}>See Review</Link>
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <DataReview />
    </>
  );
}

export default CardReview;
