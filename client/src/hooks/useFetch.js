import Axios from "../helpers/axios.js";
import ErrorHandler from "../helpers/ErrorHandler.js";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

export const useFetch = ({url, setter, headers = {}}) => {
    const dispatch = useDispatch()

    const fetchData = async () => {
        try {
            let {data} = await Axios({
                method: 'get',
                url: url,
                headers: headers
            });

            dispatch(setter(data.data))
        } catch (error) {
            ErrorHandler(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return function refetch() {
        fetchData()
    }
}