import Axios from "../../helpers/axios";
import { errorHandler } from "../../helpers/errorHandler";
import { setAnimes } from "./animeSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const fetchAnimesRdx = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(`/animes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      dispatch(setAnimes(data));
    } catch (error) {
      console.log(error)
      // errorHandler(error);
    }
  };
};
