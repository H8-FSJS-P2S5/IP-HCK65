import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


function Register() {
  const navigate = useNavigate();

  const [formRegister, setFormRegister] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleOnSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      // console.log("register nih jsx", formRegister);
  
      const result = await Swal.fire({
        title: "Do you want add a New User?",
        showCancelButton: true,
        cancelButtonColor: "#67729D",
        confirmButtonText: "Yes",
        confirmButtonColor: "#BB9CC0"
      });
  
      if (result.isConfirmed) {
        try {
          const { data } = await axios.post(
            "http://localhost:3000/register",
            formRegister,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
      
          console.log(data, ">>res");
      
          if (data.id) {
            await Swal.fire({
              position: "top-center",
              icon: "success",
              title: `telah berhasil dibuat ${data.email}`,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/login");
          } else {
            console.error("register", data);
          }
        } catch (error) {
          console.error("register", error);
        }
      }
      
      
    } catch (error) {
      console.log(error, "registerpage jsx");
      throw error;
    }
  };

  const handleChangeRegister = (e) => {
    // console.log("ini bakal change");
    const { value, name } = e.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  };

  return (
    <>
      <div className="container-register">
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
                Create An Account
              </h1>
              <p className="mt-2 text-gray-500">
                Sign up below to access your account
              </p>
            </div>
            <div className="mt-5">
              <form action="" onSubmit={handleOnSubmitRegister}>

              <div className="relative mt-6">
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="fullName"
                    value={formRegister.fullName}
                    onChange={handleChangeRegister}
                    className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  />
                  <label
                    htmlFor="fullName"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    FullName
                  </label>
                </div>

                <div className="relative mt-6">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formRegister.email}
                    onChange={handleChangeRegister}
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
                    value={formRegister.password}
                    onChange={handleChangeRegister}
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
                    REGISTER
                  </button>

                  <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                      Already have an Account?
                      <Link
                        className="font-semibold text-black-500 transition-colors hover:text-blue-700"
                        to="/login"
                      >
                        <br />
                        Sign In
                      </Link>
                    </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
