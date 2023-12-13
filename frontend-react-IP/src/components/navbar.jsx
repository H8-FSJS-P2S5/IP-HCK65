import { useLocation, useNavigate } from "react-router-dom";
import LoginBtn from "./btn-login";
import LogoutBtn from "./btn-logout";
import { useEffect } from "react";

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

  const handleToMyPage = () => {
    navigate("/myAnimes");
  };
  useEffect(() => {
    themeChange(false);
  });

  return (
    <>
      <div className="navbar bg-base-300 sticky top-0 z-30">
        <div className="left-1">
          <button className="btn btn-ghost text-xl" onClick={handleToHome}>
            Weebify
          </button>
        </div>
        <div className="flex-1 justify-center text-center">
          <h1 className="text-white text-2xl drop-shadow-xl">Welcome Me</h1>
        </div>
        <div className="flex" id="btn-add-user-admin">
          <button className="btn btn-ghost text-md" onClick={handleToMyPage}>
            <span>My Animes</span>
          </button>
        </div>
        <div className="flex-none" id="btn-login/logout">
          {pageLocation ? <LoginBtn /> : <LogoutBtn />}
        </div>
      </div>
    </>
  );
}
