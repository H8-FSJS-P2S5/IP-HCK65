import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    // console.log(code);
    const postCode = () => {
        axios.post('http://localhost:3000/login', {
            code,
        }).then(res => {
            console.log(res.data);
        })
    }
    useEffect(() => {
        postCode()
    }, [code])
}