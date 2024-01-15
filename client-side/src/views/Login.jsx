import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  // console.log("masuk login");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("login nih jsx", formLogin);
      const { data } = await axios.post(
        "https://ip.enchareal.cloud/login",
        formLogin
      );

      console.log(data, "login on submit");
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("status", data.status)

      navigate("/");
    } catch (error) {
      console.log(error, "loginpage jsx");
      throw error;
    }
  };

  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    try {
      const { data } = await axios.post("https://ip.enchareal.cloud/google-login", null, {
        headers: {
          google_token: response.credential
        }
      })
      console.log(data, "data google login di login jsx");
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("id", data.id)
      localStorage.setItem("status", data.status)

      navigate("/")
    } catch (error) {
      console.log(error, "login goole");
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "559649188298-ku7an5ohuk0giqmu0tmr7gm641tln23l.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton( 
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, [])

  return (
    <>
      <>
        <div className="container-login" style={{marginTop: "200px"}}>
          <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div className="w-full">
              <div className="text-center">
                <h1
                  className="text-3xl font-semibold text-gray-900"
                  style={{
                    fontfamily: "serif",
                    letterSpacing: "2px",
                    fontWeight: "bold",
                  }}
                >
                  Sign In
                </h1>
                <p className="mt-2 text-gray-500">
                  Sign in below to access your account
                </p>
              </div>
              <div className="mt-5">
                <form action="" onSubmit={handleOnSubmit}>
                  <div className="relative mt-6">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formLogin.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                      autoComplete="NA"
                    />
                    <label
                      htmlFor="email"
                      className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative mt-6">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formLogin.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    />
                    <label
                      htmlFor="password"
                      className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                    >
                      Password
                    </label>
                  </div>

                  <div className="my-6">
                    <button
                      type="submit"
                      className="w-full rounded-m px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                      style={{
                        backgroundColor: "black",
                        borderRadius: "7px",
                        fontWeight: "bold",
                        letterSpacing: "2px",
                      }}
                    >
                      SIGN IN
                    </button>

                    <div className="flex items-center justify-center" style={{margin: "10px"}} id="buttonDiv"></div>

                    <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                      Don't have an account yet?
                      <Link
                        className="font-semibold text-black-500 transition-colors hover:text-blue-700"
                        to="/register"
                      >
                        <br />
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Login;
