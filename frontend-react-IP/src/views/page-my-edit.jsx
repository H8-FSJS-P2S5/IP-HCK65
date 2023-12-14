import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Axios from "../helpers/axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { errorHandler } from "../helpers/errorHandler";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataRdx } from "../features/user/asyncActionUser";
import { setUser } from "../features/user/userSlice";

export default function MyEditPage() {
  const { id } = useParams();
  let navigate = useNavigate();

  const backgroundImage = {
    backgroundImage:
      "url('https://e1.pxfuel.com/desktop-wallpaper/923/616/desktop-wallpaper-gawr-gura-and-amelia-watson-vibing-near-a-campfire-live-amelia-watson-chibi.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    filter: "brightness(90%)",
  };

  const dispatch = useDispatch();
  let user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchUserDataRdx());
  }, []);

  let token = localStorage.getItem("access_token");

  const formRef = useRef(null);

  const closePage = (data) => {
    formRef.current.reset();
    dispatch(
      setUser({
        username: "",
        email: "",
        password: "",
      })
    );
    toast.success("Profile has been updated successfully");
    navigate(`/`);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    // console.log(event.target, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    dispatch(
      setUser((prevValue) => ({
        ...prevValue,
        [name]: value,
      }))
    );
  };

  const handleEditProfile = async (event) => {
    event.preventDefault();
    try {
      let { data } = await Axios.put(`/users/me`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //   console.log(data);
      closePage(data);
    } catch (error) {
      errorHandler(error);
    }
  };

  async function handleExit(event) {
    try {
      navigate("/");
    } catch (error) {
      errorHandler(error);
    }
  }

  // console.log(user);
  return (
    <>
      <section className="flex justify-center h-screen" style={backgroundImage}>
        <div className="card shadow-xl backdrop-blur-xl rounded-xl my-8 h-fit">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleExit}
          >
            ✕
          </button>
          <h1 className="text-3xl font-bold flex justify-center m-4">
            Edit Profile
          </h1>
          <div className="">
            <form
              ref={formRef}
              className="py-2 px-8 grid grid-cols-2 gap-4"
              id="form-add"
              onSubmit={handleEditProfile}
            >
              <div className="mb-2">
                <label htmlFor="inputUsername" className="text-md label">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="insert username"
                  className="input input-bordered input-primary w-full"
                  name="username"
                  value={user.username}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="inputEmail" className="text-md label">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="insert email"
                  className="input input-bordered input-primary w-full"
                  name="email"
                  value={user.email}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="inputPassword" className="text-md label">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="insert password"
                  className="input input-bordered input-primary w-full"
                  name="password"
                  value={user.password}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex justify-end">
                <button className="btn btn-success w-32 my-2 bottom-4 right-4">
                  Edit Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
