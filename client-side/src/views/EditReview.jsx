import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";



function EditReview() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [editReview, seteditReview] = useState({
        name: "",
        headline: "",
        review: "",
        UserId: "",
        MovieId: ""
    });
  
    const handleEdit = async (e) => {
      try {
        e.preventDefault();
  
        console.log(editReview, "ini edit article jsx");
        const response = await axios.put(
          `/movie/review/edit/${id}`,
          editReview,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
  
        navigate(`/movie/review/${id}`);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    
  const loadReview = async (id) => {
    try {
      // e.preventDefault();

      console.log(localStorage.getItem("access-token"),"masuk edit");
      const response = await axios.get(` https://api.enchareal.cloud/articles/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response, ">>>>>");

      seteditReview({
        name: response.data.name,
        headline: response.data.headline,
        review: response.data.review,
        UserId: response.data.UserId,
        MovieId: response.data.MovieId
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSubmitEdit = (e) => {
    const { value, name } = e.target;
    seteditReview({
      ...editReview,
      [name]: value,
    });
  };

  useEffect(() => {
    loadReview(id);
  }, [id]);

  return (
    <>
      <div className="container-login m-10">
        <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
          <div className="w-full">
            <div className="text-center">
              <h1
                className="text-3xl font-semibold text-gray-900"
                style={{
                  fontfamily: "serif",
                  letterSpacing: "2px",
                  fontWeight: "bold",
                }}
              >
                Edit Review Movie
              </h1>
              <p className="mt-2 text-gray-500">
                Please, create your Movie Here!
              </p>
            </div>
            <div className="mt-5">
              <form action="" onSubmit={handleEdit}>
                <div className="relative mt-6">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="name"
                    value={editReview.name}
                    onChange={handleSubmitEdit}
                    className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    autoComplete="NA"
                  />
                  <label
                    htmlFor="name"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Name
                  </label>
                </div>

                <div className="relative mt-6">
                  <input
                    type="text"
                    name="UserId"
                    id="UserId"
                    placeholder="UserId"
                    value={editReview.UserId}
                    onChange={handleSubmitEdit}
                    className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    autoComplete="NA"
                  />
                  <label
                    htmlFor="name"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    User ID
                  </label>
                </div>

                <div className="relative mt-6">
                  <input
                    type="text"
                    name="MovieId"
                    id="MovieId"
                    placeholder="MovieId"
                    value={editReview.MovieId}
                    onChange={handleSubmitEdit}
                    className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    autoComplete="NA"
                  />
                  <label
                    htmlFor="name"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Movie ID
                  </label>
                </div>

                <div className="relative mt-6">
                  <input
                    type="text"
                    name="headline"
                    id="headline"
                    value={editReview.headline}
                    onChange={handleSubmitEdit}
                    placeholder="Headline"
                    className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    autoComplete="NA"
                  />
                  <label
                    htmlFor="headlineReview"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Write a headline for your review here
                  </label>
                </div>
                <div className="relative mt-6">
                  <textarea
                    name="review"
                    id="review"
                    value={editReview.review}
                    onChange={handleSubmitEdit}
                    placeholder="Write your Review Here"
                    className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  ></textarea>
                  <label
                    htmlFor="review"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Write your Review Here
                  </label>
                </div>
                

                <div className="my-6">
                  <button
                    type="submit"
                    className="w-full rounded-m px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                    style={{
                      backgroundColor: "black",
                      borderRadius: "7px",
                      fontWeight: "bold",
                      letterSpacing: "2px",
                    }}
                  >
                    Add Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditReview;
