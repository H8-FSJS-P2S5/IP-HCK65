import {
  createBrowserRouter, redirect
} from "react-router-dom";
import HomePage from "./pages/Home-Page";
import LoginPage from "./pages/Login-Page";
import UserPage from "./pages/User-Page";
import DetailPage from "./pages/Detail-Page";
import RegisterPage from "./pages/Register-Page";


const authen = () => {
  const isLogin = localStorage.getItem('access_token')
  if (!isLogin) {
    throw redirect('/login')
  } else {
    return null
  }
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    // loader : authen
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      const isLogin = localStorage.getItem('access_token')
      if (isLogin) {
        throw redirect('/dashboard')
      } else {
        return null
      }
    }
  },
  {
    path: '/register',
    element: <RegisterPage />
    
  },
  {
    path: "/dashboard",
    element: <UserPage />,
    loader: authen
  },
  {
    path: "/book-detail/:id",
    element: <DetailPage />,
    // loader : authen
  },
]);

export default router