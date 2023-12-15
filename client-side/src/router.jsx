import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./views/Login";
import Register from "./views/Register";
import Layout from "./views/Layout";
import CardMovie from "./views/CardMovie";
import CardReview from "./views/CardReviewById";
import AddReview from "./views/AddReview";
import DataReview from "./views/DataReview";
import EditReview from "./views/EditReview";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: < Register/>,
  },
  {
    path: "/login",
    element: < Login/>,
    loader: () => {
      const isLogin = localStorage.getItem("access-token");
      if (isLogin) {
        return redirect("/");
      } else {
        return null;
      }
    },
  },
  {
    element: < Layout/>,
    loader: () =>
    !localStorage.getItem("access_token") && redirect("/"),
    children: [
      {
        path: "/",
        element: < CardMovie/>
      },
      {
        path: "/movie/review/:id",
        element: < CardReview />,
      }, {
        path: "/movie/add/review/:id",
        element: < AddReview/>
      }, 
      {
        path: "/movie/detail/review/:id",
        element: < DataReview/>
      },
      {
        path: "/movie/review/edit/:id",
        element: < EditReview/>
      }
    ]
  }
]);
