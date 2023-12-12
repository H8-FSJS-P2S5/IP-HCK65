import {Outlet} from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent.jsx";

function Layout() {
    return (
        <>
            <NavbarComponent/>
            <Outlet/>
        </>
    )
}

export default Layout
