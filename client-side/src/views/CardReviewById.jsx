import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DataReview from "./DataReview";

function CardReview() {
  const { id } = useParams();
  const [detailReview, setDetailReview] = useState();
  const navigate = useNavigate()
  const fetchDetailReview = async () => {
    try {
      console.log("masuk");
      // id buat edit dibawah
     
      const response = await axios.get(`https://ip.enchareal.cloud/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response.data, "card review");
      setDetailReview(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const changeStatusUsertoPremium = async (userId) => {
    try {
      console.log("masuk change status");
      const {data} = await axios({
        method: "put",
        url: `https://ip.enchareal.cloud/user/status/${userId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      localStorage.removeItem("status");
      console.log(data, "dari card review");
      localStorage.setItem("status", data.status)
      navigate(`/movie/review/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePremium = async () => {
    try {
      console.log("masuk payment");
      const { data } = await axios({
        method: "POST",
        url: `https://ip.enchareal.cloud/movies/upgrade-account/`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      let userId = localStorage.getItem("id")

      window.snap.pay(data.token, {
        onSuccess: function (result) {
          changeStatusUsertoPremium(userId);
        },
      });
    } catch (error) {
      console.log(error);

      // alert(error.response.data.message);
    }
  };
  // fungsi handlepremium => taro di onclick
  //changestatususer (ini buat ubah free ke premium)
  // di changestatus user localStorage.setItem("status" )
  // id changestatususer  // let userid=localStorage.getItem("id")



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
            {/* {localStorage.getItem("status") == "premium" && (
              <div className="card-actions justify-end">
                <button
                  type="button"
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <Link to={`/movie/add/review/${id}`}>Add Review</Link>
                </button>
             
              </div>
            )} */}

            {localStorage.getItem("status") == "premium" ? (
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
            ):(
              <div className="card-actions justify-end">
              <button
                type="button"
                // pake onlick handlepayment, jangan pake link to
                onClick={() => {
                  // console.log("logout navbar");
                 handlePremium()
                }}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <>Buy Premium to add review</>
              </button>
              {/* <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <Link to={`/movie/detail/review/${id}`}>See Review</Link>
            </button> */}
            </div>
            )}
          </div>
        </div>
      </div>

      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
      <DataReview />
    </>
  );
}

export default CardReview;
