import { useState } from "react";
import Axios from "../helpers/axios";
import { errorHandler } from "../helpers/errorHandler";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  let navigate = useNavigate("");
  const [form, setForm] = useState({
    inputCreds: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setForm((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  // console.log(form)

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const { data } = await Axios.post("/login", form);
      localStorage.setItem("access_token", data.access_token);

      navigate("/");
    } catch (error) {
      // console.error(error);
      errorHandler(error);
    }
  }

  function handleNavToRegister(event) {
    navigate("/register");
  }

  return (
    <>
      <section>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleLogin}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username / email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="username / email"
                    className="input input-bordered"
                    name="inputCreds"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    name="password"
                    onChange={handleOnChange}
                  />
                  <label className="label">
                    new here?
                    <span>
                      <a
                        onClick={handleNavToRegister}
                        className="label-text-alt link link-hover"
                      >
                        Register Now!
                      </a>
                    </span>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}
