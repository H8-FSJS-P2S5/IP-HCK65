import {createBrowserRouter, redirect} from "react-router-dom";
import Register from "./views/Register.jsx";
import Login from "./views/Login.jsx";
import Layout from "./layouts/Layout.jsx";
import ListCampaign from "./views/ListCampaign.jsx";
import BalanceHistory from "./views/BalanceHistory.jsx";
import CMSListCampaign from "./views/CMSListCampaign.jsx";
import CMSCreateCampaign from "./views/CMSCreateCampaign.jsx";
import Checkout from "./views/Checkout.jsx";
import CMSUpdateCampaign from "./views/CMSUpdateCampaign.jsx";
import DetailCampaign from "./views/DetailCampaign.jsx";
import Axios from "./helpers/axios.js";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        loader: () => {
            if (!localStorage.getItem("access_token")) {
                throw redirect("/login")
            }
            return null
        },
        children: [
            {
                path: "",
                element: <ListCampaign/>,
            },
            {
                path: "campaigns/:id",
                element: <DetailCampaign/>,
            },
            {
                path: "balance-histories",
                element: <BalanceHistory/>,
            },
        ]
    },

    {
        path: "/",
        element: <Layout/>,
        loader: async () =>  {
            if (!localStorage.getItem("access_token")) {
                throw redirect("/login")
            }

            if (localStorage.getItem("access_token")) {
                let {data} = await Axios({
                    method: "get",
                    url: "/user-information",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                })

                if(data.data.role !== 'admin'){
                    throw redirect("/")
                }

            }
            return null
        },
        children: [
            {
                path: "cms/campaigns",
                element: <CMSListCampaign/>,
            },
            {
                path: "cms/campaigns/:id",
                element: <CMSUpdateCampaign/>,
            },
            {
                path: "cms/campaigns/create",
                element: <CMSCreateCampaign/>,
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
    {
        path: "checkout",
        element: <Checkout/>
    },
]);


