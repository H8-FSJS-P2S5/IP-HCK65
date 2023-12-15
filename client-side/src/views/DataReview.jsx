import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function DataReview() {
  const { id } = useParams();
  const [reviewById, setReviewById] = useState([]);

  const fetchReviewById = async () => {
    console.log("masuk");
    try {
      console.log(id, "masuk user review");

      const response = await axios.get(
        `http://localhost:3000/movie/detail/review/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response.data, "data user review");
      setReviewById(response.data);
    } catch (error) {
      console.error("Error fetching review data", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/movie/review/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    fetchReviewById();
  };

  useEffect(() => {
    fetchReviewById();
  }, [id]);

  return (
    <>
      <div className="m-10">
        <h2 className="font-extrabold text-center text-2xl">User Reviews</h2>
      </div>

      <div className="flex flex-wrap justify-center">
        {reviewById?.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
          >
            <div className="h-auto border border-black hover:bg-blue-200 transition ease-in-out cursor-pointer px-4 py-6 rounded-xl relative flex flex-col justify-between">
              <div>
                <p className="font-thin text-white whitespace-pre-line break-words"></p>
                <p className="font-bold text-lg flex items-center sm:mb-0">
                  {item.headline}
                </p>
                <p style={{ fontStyle: "italic" }}>{item.review}</p>
              </div>
              <div className="flex items-center justify-between mt-6">
                <p style={{ fontStyle: "italic" }}>{item.name}</p>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="text-gray-900 bg-white border border-blue-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-600 dark:focus:ring-blue-700"
                  >
                    <Link to={`/movie/review/edit/${id}`}>Edit</Link>
                  </button>
                  <button
                    type="button"
                    className="text-red-600 bg-white border border-red-600 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-red-600 dark:hover:bg-red-700 dark:hover:border-red-600 dark:focus:ring-red-700"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DataReview;
