import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import CardRecommendationTracks from "./components/Card/CardRecommendationTracks";
import CardRecommendationArtists from "./components/Card/CardRecommendationArtists";
import Profile from "./components/Profile/Profile";

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
                loader: () => {
                    const isLogin = localStorage.getItem('access_token')
                    if(!isLogin) {
                        throw redirect('/login')
                    } else {
                        return null
                    }
                }
            },
            {
                path: '/reccommend/by-tracks',
                element: <CardRecommendationTracks />,
                loader: () => {
                    const isLogin = localStorage.getItem('access_token')
                    if(!isLogin) {
                        throw redirect('/login')
                    } else {
                        return null
                    }
                }
            },
            {
                path: '/reccommend/by-artists',
                element: <CardRecommendationArtists />,
                loader: () => {
                    const isLogin = localStorage.getItem('access_token')
                    if(!isLogin) {
                        throw redirect('/login')
                    } else {
                        return null
                    }
                }
            },
            {
                path: '/profile',
                element: <Profile />,
                loader: () => {
                    const isLogin = localStorage.getItem('access_token')
                    if(!isLogin) {
                        throw redirect('/login')
                    } else {
                        return null
                    }
                }
            },
        ]
    }
])