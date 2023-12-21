import axios from "axios";
import { setProfile } from "./profileSlice";

export const fetchProfile = () => {
    return async (dispatch) => {
        // console.log('gggggggggg');
        try {
            const {data} = await axios.get('http://localhost:3000/users/my-profile', {
                headers: {
                    Authorization: `${localStorage.getItem('access_token')}`
                }
            });
            // console.log(data, "from asyncAction");
            // dispatch(setProfile(response.data.body))
            dispatch(setProfile(data.body))
        } catch (error) {
            console.log(error);
        }
    }
}