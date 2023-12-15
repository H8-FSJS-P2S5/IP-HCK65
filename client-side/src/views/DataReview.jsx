import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function DataReview() {
  const { id } = useParams();
  const [reviewById, setReviewById] = useState([]);

  const fetchReviewById = async () => {
    try {
      console.log(id, "masuk user review");

      const response = await axios.get(
        `http://localhost:3000/movie/detail/review/${id}`
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
    fetchReviewById()
  }

  useEffect(() => {
    fetchReviewById();
  }, [id]);

  return (
    <>
      <div className="m-10">
        <h2 className="font-extrabold text-center text-2xl">User Reviews</h2>
      </div>

      {reviewById?.map((item) => (
        <div
          key={item.id}
          className="container-dataReview flex flex-wrap justify-center relative"
        >
          {reviewById?.map((item) => (
            <div
              key={item.id}
              className="container-dataReview flex flex-wrap justify-center relative"
            >
              <div className="rounded-xl sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 mx-2 my-5">
                <div className="h-auto max-w-full w-full border border-black hover:bg-blue-200 transition ease-in-out cursor-pointer px-4 py-6 rounded-xl relative">
                  <p className="font-thin text-white whitespace-pre-line break-words"></p>
                  <p className="font-bold text-lg flex items-center sm:mb-0">
                    {item.headline}
                  </p>
                  <p />
                  <p className="" style={{ fontStyle: "italic" }}>
                    {item.review}
                  </p>
                  <div className="flex flex-col sm:flex-row w-full items-center justify-between mt-6">
                    <p className="" style={{ fontStyle: "italic" }}>
                      {item.name}
                    </p>
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
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default DataReview;
