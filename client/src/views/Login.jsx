import {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from "react-router-dom";
import ErrorHandler from "../helpers/ErrorHandler";
import Axios from "../helpers/axios"
import {toast} from "react-toastify";
import ButtonGoogle from "../components/ButtonGoogle.jsx";


function Login() {
    const navigate = useNavigate()

    const handlerSubmitLogin = async (event) => {
        event.preventDefault()
        try {
            let {data} = await Axios({
                method: 'post',
                url: '/login',
                data: formLogin
            });

            localStorage.setItem("access_token", data.access_token)

            let notify = () => toast("login berhasil");
            notify()
            navigate('/')
        } catch (error) {
            ErrorHandler(error)
        }
    }


    let [formLogin, setFormLogin] = useState({
        "email": "",
        "password": "",
    })

    const handlerChange = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value
        })
    }



    return (
        <>
            <div className="col-lg-4 offset-4 mt-5">
                <Form onSubmit={handlerSubmitLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" onChange={handlerChange} value={formLogin.email}
                                      placeholder="Enter email"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={handlerChange}
                                      value={formLogin.password} placeholder="Password"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <Link to="/register" className="btn btn-link">Register</Link>
                    <ButtonGoogle/>
                </Form>
            </div>
        </>
    )
}

export default Login
