import { createBrowserRouter, redirect } from "react-router-dom";

import HomePage from "./views/page-home";
import LoginPage from "./views/page-login";
import RegisterPage from "./views/page-register";
import MyPage from "./views/page-my";
import MyEditPage from "./views/page-my-edit";
import RootLayout from "./layouts/rootlayout";
import FourOFourPage from "./views/404-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token");
      if (!isLoggedIn) {
        throw redirect("/login");
      } else {
        return null;
      }
    },
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  }, //CHECKED, OK
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token");
      if (isLoggedIn) {
        throw redirect("/");   
      } else {
        return null;
      }
    },
  }, //CHECKED OK
  {
    path: "/register",
    element: <RegisterPage />,
  }, //CHECKED OK
  {
    path: "/my/:id",
    element: <RootLayout />,
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token");
      if (isLoggedIn) {
        return null;
      } else {
        throw redirect("/login");
      }
    },
    children: [
      {
        path: "",
        element: <MyPage />,
      },
      {
        path: "/my/:id/edit",
        element: <MyEditPage />,
      },
    ],
  }, //CHECKED OK
  {
    path: "/*",
    element: <FourOFourPage />,
  }, //CHECKED OK
]);

export { router };
