import {RouterProvider} from "react-router-dom";
import {router} from "./router.jsx";

import {ToastContainer} from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
    return (
        <>
            <ToastContainer/>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
