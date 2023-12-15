import {RouterProvider} from "react-router-dom";
import {router} from "./router.jsx";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import store from './app/store'
import {Provider} from 'react-redux'

function App() {
    return (
        <>
            <Provider store={store}>
                <ToastContainer/>
                <RouterProvider router={router}/>
            </Provider>
        </>
    )
}

export default App
