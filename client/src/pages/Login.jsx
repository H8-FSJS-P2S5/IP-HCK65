// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,
//   MDBIcon,
//   MDBCheckbox,
// } from "mdb-react-ui-kit";
import { Link } from 'react-router-dom'

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/login",
        userInput
      );
      console.log(data, ">>>>>>>>>");
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-md">
        <div className="py-8 px-8 rounded-xl">
          <h1 className="font-medium text-2xl mt-3 text-center">Login</h1>
          <form onSubmit={handleLogin} className="mt-6">
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
              Login
            </button>
          </form>

          <div className="flex md:justify-between justify-center items-center mt-10">
            <div className="bg-gray-300 md:block hidden w-4/12"></div>
            <p className="md:mx-2 text-sm font-light text-gray-400">
              {" "}
              Login With Social{" "}
            </p>
            <div className="bg-gray-300 md:block hidden w-4/12"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-2 mt-7">
            <div>
              <button className="text-center w-full text-white bg-blue-900 p-3 duration-300 rounded-sm hover:bg-blue-700">
              Facebook  
              </button>
            </div>
            <div>
              <button className="text-center w-full text-white bg-red-400 p-3 duration-300 rounded-sm hover:bg-red-500">
                GOOGLE
              </button>
            </div>
          </div>

          <p className="mt-12 text-xs text-center font-light text-gray-400">
            {" "}
            Don't have an account?{" "}
            
            <Link className="text-black font-medium" to='/register'>Register</Link>
           
          </p>
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     <MDBContainer fluid>
  //       <MDBRow className="d-flex justify-content-center align-items-center h-100">
  //         <form
  //         onSubmit={handleLogin}
  //         style={{ marginTop: "0px", padding: "0px 0px" }}
  //         id="form1"
  //       >
  //         <MDBCol col="12">
  //           <MDBCard
  //             className="bg-white my-5 mx-auto"
  //             style={{ borderRadius: "1rem", maxWidth: "500px" }}
  //           >
  //             <MDBCardBody className="p-5 w-100 d-flex flex-column">
  //               <h2 className="fw-bold mb-2 text-center">Sign in</h2>
  //               <p className="text-white-50 mb-3">
  //                 Please enter your login and password!
  //               </p>

  //               <MDBInput
  //                 wrapperClass="mb-4 w-100"
  //                 label="Email address"
  //                 id="formControlLg"
  //                 name="email"
  //                 type="email"
  //                 value={userInput.email}
  //                 onChange={handleUser}
  //                 size="lg"
  //               />
  //               <MDBInput
  //                 wrapperClass="mb-4 w-100"
  //                 label="Password"
  //                 id="formControlLg"
  //                 name="password"
  //                 type="password"
  //                 value={userInput.password}
  //                 onChange={handleUser}
  //                 size="lg"
  //               />

  //               <MDBCheckbox
  //                 name="flexCheck"
  //                 id="flexCheckDefault"
  //                 className="mb-4"
  //                 label="Remember password"
  //               />

  //               <MDBBtn size="lg" type="button" onClick={handleLogin} form="form1">Login</MDBBtn>

  //               <hr className="my-4" />

  //               <MDBBtn
  //                 className="mb-2 w-100"
  //                 size="lg"
  //                 style={{ backgroundColor: "#dd4b39" }}
  //               >
  //                 <MDBIcon fab icon="google" className="mx-2" />
  //                 Sign in with google
  //               </MDBBtn>

  //               <MDBBtn
  //                 className="mb-4 w-100"
  //                 size="lg"
  //                 style={{ backgroundColor: "#3b5998" }}
  //               >
  //                 <MDBIcon fab icon="facebook-f" className="mx-2" />
  //                 Sign in with facebook
  //               </MDBBtn>
  //             </MDBCardBody>
  //           </MDBCard>
  //         </MDBCol>
  //       </form>
  //       </MDBRow>
  //     </MDBContainer>
  //   </>
  // );
}
