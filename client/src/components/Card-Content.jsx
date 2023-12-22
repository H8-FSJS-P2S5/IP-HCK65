import { useEffect, useState } from "react"
import Axios from "axios"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
export default function CardContent() {
    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 20;

    const search = useSelector((state) => state.search.search)



    const fetchBooks = async () => {
        try {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const { data } = await Axios.get(`http://localhost:3000/books`, {
                params: { q: search, startIndex, maxResults: itemsPerPage }
            });
            setBooks(data.items);
            setTotalPages(Math.ceil(data.totalItems / itemsPerPage));
        } catch (error) {
            console.log(error);
        }
    };

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };


    useEffect(() => {
        fetchBooks()
    }, [search, currentPage])

    return (
        <>
            <div className="flex flex-wrap pt-2 gap-4 w-full max-w-screen-xl px-6 py-4 mx-auto">
                {books.map(books => (
                    <div className="relative flex-col items-center max-w-screen-xl text-gray-700 bg-gray-200 shadow-md bg-clip-border rounded-xl w-[205px]  min-w-screen-sm mx-auto">
                        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-60">
                            <img
                                src={books.volumeInfo.imageLinks && books.volumeInfo.imageLinks.thumbnail}
                                alt="card-image" className="object-cover w-full h-full" />
                        </div>
                        <div className="p-6" >
                            <div className="flex items-center justify-between mb-2">
                                <p className="block font-sans font-semibold text-base antialiased leading-relaxed text-blue-gray-900" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    {books.volumeInfo.title}
                                </p>
                            </div>
                        </div>
                        <div className="p-6 pt-0 flex flex-row justify-between flex-1">
                            <Link to={`/book-detail/${books.id}`}>
                                <button
                                    className="justify-end align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-black text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                    type="button">
                                    See Detail
                                </button></Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}
                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                        aria-hidden="true" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                    </svg>
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => page >= currentPage - 2 && page <= currentPage + 2)
                    .slice(0, 3)
                    .map(page => (
                        <button
                            key={page}
                            onClick={() => changePage(page)}
                            className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase shadow-md shadow-white transition-all ${currentPage === page ? 'bg-black text-white' : 'bg-white text-black hover:bg-black'}`}
                        >
                            {page}
                        </button>
                    ))
                }

                <button
                    onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                        aria-hidden="true" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                    </svg>
                </button>
            </div>
        </>
    )
}