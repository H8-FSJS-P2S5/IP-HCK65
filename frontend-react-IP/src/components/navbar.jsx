import { useLocation, useNavigate } from "react-router-dom";
import LoginBtn from "./btn-login";
import LogoutBtn from "./btn-logout";
import Axios from "../helpers/axios";
import { useEffect } from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../features/user/userSlice";
import { fetchUserDataRdx } from "../features/user/asyncActionUser";

export default function NavBar() {
  let location = useLocation().pathname;
  let navigate = useNavigate();
  // console.log(location);
  let token = localStorage.getItem("access_token");
  let pageLocation;
  if (location === "/") pageLocation = false;

  const handleToHome = (event) => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  const handleToMyPage = (e) => {
    navigate(`my/${e.target.value}}`);
  };

  const handleUpgradeAcc = async () => {
    let { data } = await Axios({
      url: "pay/stripe/",
      method: "post",
      data: {
        product_data_name: "Upgrade to Weebify Premium",
        product_data_unit_amount: 150_000_00,
        product_data_currency: "idr",
        product_data_quantity: 1,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    // console.log(data, "DARI UPGRADE ACC");
    window.location = data.url;
  };
  const handleNavToProfile = (e) => {
    navigate(`my/${e.target.value}/edit`);
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchUserDataRdx());
  }, []);

  let isPremium = true;
  if (user.status !== "Premium") {
    isPremium = false;
  }
  // console.log(isPremium); // => false

  // console.log(user, "INI USER DARI NAVBAR");

  return (
    <>
      <div className="navbar bg-base-300 sticky top-0 z-30 gap-4">
        <div className="left-1">
          {isPremium ? (
            <button className="btn btn-ghost text-xl" onClick={handleToHome}>
              Weebify Premium
            </button>
          ) : (
            <button className="btn btn-ghost text-xl" onClick={handleToHome}>
              Weebify
            </button>
          )}
        </div>
        <div className="flex-1 justify-center text-center">
          <h1 className="text-white text-2xl drop-shadow-xl">
            Welcome {user.username}
          </h1>
        </div>
        <div className="flex" id="btn-nav-profile">
          <button
            className="btn btn-ghost text-md"
            onClick={handleNavToProfile}
            value={user.id}
          >
            <span>Profile</span>
          </button>
        </div>
        {isPremium ? (
          ""
        ) : (
          <div className="flex" id="btn-add-upgrade">
            <button
              className="btn btn-ghost text-md"
              onClick={handleUpgradeAcc}
              value={user.id}
            >
              <span>Upgrade</span>
            </button>
          </div>
        )}
        <div className="flex" id="btn-add-my-animes">
          <button
            className="btn btn-ghost text-md"
            onClick={handleToMyPage}
            value={user.id}
          >
            <span>My Animes</span>
          </button>
        </div>
        <div className="flex-none" id="btn-login/logout">
          {pageLocation ? <LoginBtn /> : <LogoutBtn />}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
