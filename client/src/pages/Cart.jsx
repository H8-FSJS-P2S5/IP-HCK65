import { useNavigate, redirect } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [fetchCart, setFetchCart] = useState([]);
  const [sumPrice, setSumPrice] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios({
      method: "GET",
      url: "http://localhost:3000/carts",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        const cart = response.data;
        setSumPrice(cart.reduce((a, v) => (a = a + v.price), 0));
        setFetchCart(cart);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = async (id) => {
    try {
      await axios({
        method: "DELETE",
        url: "http://localhost:3000/carts/" + id,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-md overflow-x-auto">
        <div className="overflow-x-auto">
          <div className="flex justify-center h-6 mt-4">
            <h1 className="font-bold text-2xl">Cart</h1>
          </div>
          <table className="table mt-6">
            {/* head */}

            <thead>
              <tr>
                <th className="lg:w-1/2 md:w-1/2">Name</th>
                <th className="lg:w-1/4 md:w-1/4">Price</th>
                <th className="lg:w-1/4 md:w-1/4"></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {fetchCart.map((e, i) => {
                return (
                  <tr key={i}>
                    <td className="lg:w-1/2 md:w-1/2">{e.name}</td>
                    <td className="lg:w-1/4 md:w-1/4">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(e.price)}
                    </td>
                    <th className="lg:w-1/4 md:w-1/4">
                      <button className="btn btn-ghost btn-xs">
                        <MdDelete
                          key={e.id}
                          size={24}
                          color="red"
                          onClick={() => handleDelete(e.id)}
                        />
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>Amount</th>
                <th>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(sumPrice)}
                </th>
                <th className="lg:w-1/4 md:w-1/4"></th>
              </tr>
            </tfoot>
          </table>
          <div className="mx-24 mt-40 sm:w-32">
            <button className="btn btn-wide btn-active btn-warning">Pay</button>
          </div>
        </div>
      </div>
    </>
  );
}
