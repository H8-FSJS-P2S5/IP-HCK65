import { Link } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validation } from "../utils/validation";
import { ToastContainer } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleUser = async (e) => {
    const { name, value } = e.target;

    setUserInput((val) => ({
      ...val,
      [name]: value,
    }));
  };

  const handleReg = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/register",
        userInput
      );
      // console.log(data, ">>>>>>>>>");
      // localStorage.setItem("access_token", data.access_token);
      navigate("/login");
    } catch (error) {
      validation(error)
    }
  };

  return (
    <>
      <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-md">
        <div className="py-8 px-8 rounded-xl">
          <h1 className="font-medium text-2xl mt-3 text-center">Register</h1>
          <ToastContainer />
          <form onSubmit={handleReg} className="mt-6">
            <div className="my-5 text-sm">
              <label className="block text-black">Name</label>
              <input
                type="text"
                name="name"
                value={userInput.name}
                onChange={handleUser}
                autofocus
                id="email"
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                placeholder="Email"
              />
            </div>
            <div className="my-5 text-sm">
              <label className="block text-black">Email</label>
              <input
                type="email"
                name="email"
                value={userInput.email}
                onChange={handleUser}
                autofocus
                id="email"
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                placeholder="Email"
              />
            </div>
            <div className="my-5 text-sm">
              <label className="block text-black">Password</label>
              <input
                type="password"
                name="password"
                value={userInput.password}
                onChange={handleUser}
                id="password"
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
            >
              Register
            </button>
          </form>

          <p className="mt-12 text-xs text-center font-light text-gray-400">
            {" "}
            Have an account?{" "}
            <Link className="text-black font-medium" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}