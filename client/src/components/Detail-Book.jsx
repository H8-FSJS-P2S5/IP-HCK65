import Axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {toast } from 'react-toastify';


export default function DetailBook() {
    const [books, setBooks] = useState({})
   
    const [form, setForm] = useState()

    const fatchBooks = async () => {
        try {
            const { data } = await Axios.get(`http://localhost:3000/books/${id}`)
            console.log(data);
            setBooks(data)
        } catch (error) {
            console.log(error);
        }
    }

    // const isLogin = localStorage.getItem('access_token')
      const isLogin = useMemo(() => {
        return !!localStorage.getItem("access_token")
    })
   
    const handleAddBooks = async (event) => {
        event.preventDefault()
        try {
            if (!isLogin) {
                toast.error('Reading list just for Member, please regester first', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }else {

                await Axios.post(`http://localhost:3000/reading-list`, form, {
                    headers : {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                toast.success('Success Add Book To Reading List!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        } catch (error) {
            console.log(error);
                    
        }
    }


  

    const handleOnUpgrade = async () => {
        const { data } = await Axios.get("http://localhost:3000/payment/midtrans/initiate", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })

        window.snap.pay(data.token, {
            onSuccess: async function () {
                const requestBody = {
                    orderId: data.orderId
                }
                await Axios.patch(
                    "http://localhost:3000/users/me/upgrade",
                    requestBody,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`
                        }
                    }
                )
            }
        })
    }

    const { id } = useParams()
    useEffect(() => {
        fatchBooks(id)
    }, [])
    
    useEffect(() => {
        setForm(books)
    }, [books])
    return (
        <>
        <form onSubmit={handleAddBooks}>
            <div className="flex items-center justify-center mt-10 w-full">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-black shadow-md max-w-[64rem]" >
                    <div className=" flex flex-row ">
                        <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                            <img
                                src={books?.volumeInfo?.imageLinks && books.volumeInfo.imageLinks.thumbnail}
                                alt="card-image"
                                className="object-cover w-1/2 h-72"
                            />
                        </div>
                        <div className=" justify-start items-start font-sans text-base antialiased font-normal first-letter:">
                            <h4 className=" font-semibold text-4xl mb-10 "> {books?.volumeInfo?.title} </h4>
                            <p>
                                Author    : {books?.volumeInfo?.authors[0]}
                            </p>
                            <p>
                                Publisher : {books?.volumeInfo?.publisher}
                            </p>
                            <p>
                                Publis Date : {books?.volumeInfo?.publishedDate}
                            </p>
                            <p>
                                Pages   : {books?.volumeInfo?.pageCount}
                            </p>
                            <p>
                                Price   : Rp.{books?.saleInfo?.listPrice?.amount}
                            </p>
                            <a href={books?.accessInfo?.webReaderLink}>

                                <button
                                    class="mt-10 mr-2 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                    type="button">
                                    Read Books
                                </button>
                            </a>
                            <button
                                class="mt-10 mr-2 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                type="submit">
                                Add To List books
                            </button>
                            <Link to="/">
                            <button
                                class="mt-10 mr-2 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                type="button">
                                Back
                            </button>
                            </Link>
                            <button
                                class="mt-10 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                type="button">
                                Buy
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 block mb-8 font-sans text-base antialiased font-normal text-justify leading-relaxed text-black">
                        {books?.volumeInfo?.description}
                    </div>
                </div>
            </div>

        </form>

        </>
    )
}