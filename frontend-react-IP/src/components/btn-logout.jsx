import { useNavigate } from "react-router-dom";
// import { IoLogOutOutline } from "react-icons/io5";

export default function LogoutBtn() {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <button className="btn btn-error" onClick={handleLogout}>
      {/* <IoLogOutOutline /> */}
      Logout
    </button>
  );
}
