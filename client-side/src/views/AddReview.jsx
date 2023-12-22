import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from "axios";



function AddReview() {
  const navigate = useNavigate();
  const {id} = useParams()
  const [createReview, setCreateReview] = useState({
    name: "",
    headline: "",
    review: "",
  });

  const handleInputCreate = async (e) => {
    try {
      e.preventDefault();

      const result = await Swal.fire({
        title: "Do you want to add Review?",
        showCancelButton: true,
        cancelButtonColor: "#67729D",
        confirmButtonText: "Save",
        confirmButtonColor: "#BB9CC0",
      });

      if (result.isConfirmed) {
        const response = await axios.post(
          `http://34.142.153.182/movie/add/review/${id}`,
          createReview,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(response, "resp create");

        await Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Your review has been successfully created`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/movie/review/${id}`);
      }
    } catch (error) {
      console.log(error, "add review");
      throw error;
    }
  };

  const handleSubmit = (e) => {
    const { value, name } = e.target;
    setCreateReview({
      ...createReview,
      [name]: value,
    });
  };

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
                Review Movie
              </h1>
              <p className="mt-2 text-gray-500">
                Please, create your Movie Here!
              </p>
            </div>
            <div className="mt-5">
              <form action="" onSubmit={handleInputCreate}>
                <div className="relative mt-6">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="name"
                    value={createReview.name}
                    onChange={handleSubmit}
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

                {/* <div className="relative mt-6">
                  <input
                    type="text"
                    name="UserId"
                    id="UserId"
                    placeholder="UserId"
                    value={createReview.UserId}
                    onChange={handleSubmit}
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
                    value={createReview.MovieId}
                    onChange={handleSubmit}
                    className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    autoComplete="NA"
                  />
                  <label
                    htmlFor="name"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Movie ID
                  </label>
                </div> */}

                <div className="relative mt-6">
                  <input
                    type="text"
                    name="headline"
                    id="headline"
                    value={createReview.headline}
                    onChange={handleSubmit}
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
                    value={createReview.review}
                    onChange={handleSubmit}
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

export default AddReview;
