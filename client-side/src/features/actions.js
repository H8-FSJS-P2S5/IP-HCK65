import axios from "axios";
// import { useDispatch } from "react-redux";
import { setMovieList } from "./moviesSlice";


export const fetchDetailMovie = () => {

    return async (dispatch) => {
        // const dispatch = useDispatch()
        try {
          const accessToken = localStorage.getItem("access_token");
          if (!accessToken) {
              console.error("Access token is missing.");
              return;
          }

          const response = await axios.get("http://localhost:3000/movie", {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          });

        //   console.log('Request successful:', response.data);
          dispatch(setMovieList(response.data));
        } catch (error) {
          console.log(error);
          throw error;
        }
    }
   
  };