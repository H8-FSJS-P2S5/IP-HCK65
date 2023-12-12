import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    console.log(code);
    const postCode = async () => {
        try {
            await axios({
                url: 'http://localhost:3000/login',
                method: 'POST',
                data: {code}
            })
            console.log(res.data);
        } catch (error) {
            window.location = '/'
            console.log(error);
        }
    }
    useEffect(() => {
        postCode()
    }, [code])
}