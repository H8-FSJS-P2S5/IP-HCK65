import {useState} from "react";
import axios from "axios";
import {ToastContainer} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Carousel from 'react-bootstrap/Carousel';

function Register() {
    const navigate = useNavigate()
    let [formRegister, setFormRegister] = useState({
        "fullName": "",
        "email": "",
        "password": "",
    })

    const handlerChange = (e) => {
        setFormRegister({
            ...formRegister,
            [e.target.name]: e.target.value
        })
    }


    return (
        <>
            <ToastContainer/>

            <div className="col-lg-4 offset-4 mt-5">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicFullName">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="fullName" name="fullName" onChange={handlerChange}
                                      value={formRegister.fullName}
                                      placeholder="Enter Full Name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" onChange={handlerChange} value={formRegister.email}
                                      placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={handlerChange}
                                      value={formRegister.password} placeholder="Password"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                    <Link to="/login" className="btn btn-link">Login</Link>
                </Form>
            </div>


        </>
    )
}

export default Register
