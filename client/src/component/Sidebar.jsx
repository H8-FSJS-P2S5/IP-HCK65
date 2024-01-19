import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

import { useNavigate, NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
// import { successLogout } from "../utils/sweetAlert";

export default function SidebarPage() {
  const navigate = useNavigate();
  const handelLogout = async () => {
    try {
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const btn = () => {
    handelLogout()
      .then(() => {
        // Tampilkan SweetAlert logout berhasil
        Swal.fire({
          icon: "success",
          title: "Logout Berhasil!",
          showConfirmButton: false,
          timer: 1500, // Setelah 1,5 detik, SweetAlert akan ditutup
        });

        // Redirect atau lakukan tindakan lain setelah SweetAlert ditutup
        // Misalnya, redirect ke halaman login
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      })
      .catch((error) => {
        // Tampilkan SweetAlert jika logout gagal
        Swal.fire({
          icon: "error",
          title: "Logout Gagal!",
          text: "Terjadi kesalahan saat melakukan logout.",
        });
      });
  };
  return (
    <>
      <Card className="h-100 rounded-none w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 md:max-w-[15rem]">
        <div className="h-36">
          <img
            className="h-36"
            src="https://thumbs.dreamstime.com/b/tasty-fastfood-nutrition-unheallthy-food-vector-illustration-tasty-fastfood-nutrition-unheallthy-food-110466160.jpg"
            alt=""
          />
        </div>
        <List>
          <ListItem>
            <ListItemPrefix>
              <img
                src="https://katalogpromosi.com/wp-content/uploads/2022/07/promo-mcd-family-weekend-17022023-copy.webp"
                alt=""
                className="h-11 w-11"
              />
            </ListItemPrefix>
            <Link to="/foods">All</Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <img
                src="https://static.vecteezy.com/system/resources/previews/002/873/999/large_2x/homemade-french-toast-with-ham-bacon-and-cheese-sandwich-with-egg-photo.jpg"
                alt=""
                className="h-11 w-11"
              />
            </ListItemPrefix>
            Menu Sarapan
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <img
                src="https://th.bing.com/th/id/OIP.YEklB--xNbiceKRAsGIsCwHaEZ?rs=1&pid=ImgDetMain"
                alt=""
                className="h-11 w-11"
              />
            </ListItemPrefix>
            Ayam
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <img
                src="https://img.freepik.com/premium-photo/french-fries-3d-icon-transparent-background_168501-1504.jpg"
                alt=""
                className="h-11 w-11"
              />
            </ListItemPrefix>
            Camilan
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <img
                src="https://purepng.com/public/uploads/medium/purepng.com-ricericeseedgrainfood-1411528653966xh4tc.png"
                alt=""
                className="h-11 w-11"
              />
            </ListItemPrefix>
            Nasi
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <img
                src="https://th.bing.com/th/id/OIP.iYUE03lLdIAAhm7Sa60LigHaE5?rs=1&pid=ImgDetMain"
                alt=""
                className="h-11 w-11"
              />
            </ListItemPrefix>
            Pencuci Mulut
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <img
                src="https://th.bing.com/th/id/R.3979cc2b02c0ba72834b085efd9620d0?rik=nsSDTTDKmcE%2f7g&riu=http%3a%2f%2f1.bp.blogspot.com%2f-zXef7yEbNBY%2fUngx01yrZxI%2fAAAAAAAACcw%2fZPBSnXSllvI%2fs1600%2fMinuman-Soda-Medical-Line.jpg&ehk=Qn7ODPPamgt60mYVz2hc1mxAYmsRkn%2baWW%2f9BqSv7SE%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
                alt=""
                className="h-11 w-11"
              />
            </ListItemPrefix>
            Minuman
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              {/* <FaCartShopping className="h-9 w-9" /> */}
            </ListItemPrefix>
              <NavLink to="/cart" className="navbar-link cart-trolley--link">
              <FaCartShopping className="h-9 w-9" />
              <span className="cart-total--item">10</span>
              </NavLink>
            {/* <Link to="/cart">Cart</Link> */}
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            <button onClick={btn}>Log Out</button>
          </ListItem>
        </List>
      </Card>
    </>
  );
}
