import { useNavigate, redirect } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { errorAlert, successLogin } from "../utils/sweetAlert";

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
        console.log(cart, "??????????");
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

  const handleOnPay = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/payment/midtrans/token",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      // console.log(data, ">>>>>>>");

      window.snap.pay(data.transaction_token, {
        onSuccess: async function () {
          /* You may add your own implementation here */
          successLogin("payment success!");
          const form = {
            orderId: data.orderId,
          };
          await axios.patch("http://localhost:3000/users/me/upgrade", form, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          // console.log(response, "RRRRRRRRRRRR");
        },
        onClose: function () {
          /* You may add your own implementation here */
          errorAlert("you closed the popup without finishing the payment");
        },
      });

      // if (res)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="h-screen w-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
          </div>

          <div className="mx-auto mt-8 max-w-md md:mt-12">
            <div className="rounded-3xl bg-white shadow-lg">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
            {fetchCart.map((e, i) => {
              return (
                <div key={i} className="flow-root mb-16">
                  <ul className="-my-8">
                    <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                      <div className="shrink-0 relative">
                        <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                          1
                        </span>
                        <img
                          className="h-24 w-24 max-w-full rounded-lg object-cover"
                          src={e.img}
                          alt=""
                        />
                      </div>

                      <div className="relative flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                          <div className="pr-8 sm:pr-5">
                            <p className="text-base font-semibold text-gray-900">
                              {e.name}
                            </p>
                          </div>

                          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                            {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(e.price)}
                            </p>
                          </div>
                        </div>

                        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                          <button
                            onClick={() => handleDelete(e.id)}
                            type="button"
                            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                          >
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                                className=""
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                    
                  </ul>
                </div>
                )
              })}

                {/* <!-- <hr className="mx-0 mt-6 mb-0 h-0 border-r-0 border-b-0 border-l-0 border-t border-solid border-gray-300" /> --> */}

                
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(sumPrice)}
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={handleOnPay}
                    type="button"
                    className="group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                  >
                    Pay
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-md overflow-x-auto">
        <div className="overflow-x-auto">
          <div className="flex justify-center h-6 mt-4">
            <h1 className="font-bold text-2xl">Cart</h1>
          </div>
          <table className="table mt-6"> */}
      {/* head */}

      {/* <thead>
              <tr>
                <th className="lg:w-1/2 md:w-1/2">Name</th>
                <th className="lg:w-1/4 md:w-1/4">Price</th>
                <th className="lg:w-1/4 md:w-1/4"></th>
              </tr>
            </thead>
            <tbody> */}
      {/* row 1 */}
      {/* {fetchCart.map((e, i) => {
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
            </tbody> */}
      {/* foot */}
      {/* <tfoot>
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
            <button
              className="btn btn-wide btn-active btn-warning"
              onClick={handleOnPay}
            >
              Pay
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
}
