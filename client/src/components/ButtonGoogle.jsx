import {useEffect} from "react";
import Axios from "../helpers/axios.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


function ButtonGoogle() {
    const navigate = useNavigate()
    const handleCredentialResponse = async (response) => {
        let {data} = await Axios({
            method: 'post',
            url: '/google-login',
            data: {
                token: response.credential
            }
        });

        localStorage.setItem("access_token", data.data.access_token)

        let notify = () => toast("login berhasil");
        notify()
        navigate('/')
    }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "43568791130-soraqarjpd85u961q27bi251p1c5h5o6.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        window.google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            {theme: "outline", size: "large"}
        );
        window.google.accounts.id.prompt();
    }, []);


    return (
        <>
            <div id="buttonDiv" className="mt-2"></div>
        </>
    )
}

export default ButtonGoogle
