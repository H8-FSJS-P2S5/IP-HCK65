import {createBrowserRouter, redirect} from "react-router-dom";
import Register from "./views/Register.jsx";
import Login from "./views/Login.jsx";
import Layout from "./layouts/Layout.jsx";
import ListCampaign from "./views/ListCampaign.jsx";
import BalanceHistory from "./views/BalanceHistory.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        // loader: () => {
        //     if (!localStorage.getItem("access_token")) {
        //         throw redirect("/login")
        //     }
        //     return null
        // },
        children: [
            {
                path: "",
                element: <ListCampaign/>,
            },
            {
                path: "balance-histories",
                element: <BalanceHistory/>,
            },
        ]
    },
    {
        path: "register",
        loader: () => {
            if (localStorage.getItem("access_token")) {
                throw redirect("/")
            }
            return null
        },
        element: <Register/>
    },
    {
        path: "login",
        loader: () => {
            if (localStorage.getItem("access_token")) {
                throw redirect("/")
            }
            return null
        },
        element: <Login/>
    },
]);


