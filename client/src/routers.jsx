import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import LayoutPage from "./layout/Layout";
import RegisterPage from "./pages/Register";
import CardPage from "./component/Cards";
import FrontPage from "./pages/Front";
import CartPage from "./pages/Cart";

const router = createBrowserRouter([
    {
        path: "/front",
        element: <FrontPage />
    },
    {
      path: "/login",
      element: <LoginPage />,
      loader: () => localStorage.getItem("access_token") && redirect("/")
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/",
        element: <LayoutPage />,
        loader: () => !localStorage.getItem("access_token") && redirect("/login"),
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/foods",
                element: <CardPage />
            },
            {
                path: "/cart",
                element: <CartPage />
            }
        ]
    }
]);

export default router;