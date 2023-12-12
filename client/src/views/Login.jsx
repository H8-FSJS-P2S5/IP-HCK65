import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom";

function Login() {
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
                <Form>
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
                </Form>
            </div>
        </>
    )
}

export default Login
