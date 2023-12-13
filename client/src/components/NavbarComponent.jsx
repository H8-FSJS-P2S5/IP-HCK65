import {Link, useNavigate} from "react-router-dom";
import ErrorHandler from "../helpers/ErrorHandler.js";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarComponent() {
    const navigate = useNavigate()
    const logout = async () => {
        try {
            localStorage.removeItem("access_token")

            navigate('/login')
        } catch (error) {
            ErrorHandler(error)
        }
    }
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand>YukBisa</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                            navbarScroll>
                            <Nav.Link><Link to="/" className="nav-link-custom">
                                Home
                            </Link></Nav.Link>

                            <NavDropdown title="CMS" id="navbarScrollingDropdown">
                                <NavDropdown.Item><Link to="/cms/campaigns/create" className="nav-link-custom">
                                    Create Campaign
                                </Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="/cms/campaigns" className="nav-link-custom">
                                    List Campaign
                                </Link></NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            {(localStorage.getItem("access_token")) ?
                                <div>
                                    <Link to="/balance-histories">
                                        <Button variant="outline-success">
                                            Saldo: Rp. 150.000.000
                                        </Button>
                                    </Link>
                                    <Button className="ml-1 btn btn-danger" style={{"marginLeft": "5px"}}
                                            onClick={logout}>Logout</Button>
                                </div> :
                                <Link to='/login'>
                                    <Button variant="outline-success">Login</Button>
                                </Link>
                            }
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarComponent
