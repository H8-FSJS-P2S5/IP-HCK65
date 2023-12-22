import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchBooks, handleDelete } from "../features/books/asyncAction"


export default function CardContentCms() {
    const dispatch = useDispatch()
    const books = useSelector((state) => state.books.books)
    

    useEffect(() => {
        dispatch(fetchBooks())
    }, [])

    return (
        <>
            <div className="flex flex-wrap pt-2 gap-4 w-full max-w-screen-xl px-6 py-4 mx-auto">
                {books.map(books => (
                    <div className="relative flex-col items-center max-w-screen-xl text-gray-700 bg-gray-200 shadow-md bg-clip-border rounded-xl w-[205px]  min-w-screen-sm mx-auto">
                        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-60">
                            <img
                                src={books.imageUrl}
                                alt="card-image" className="object-cover w-full h-full" />
                        </div>
                        <div className="p-6" >
                            <div className="flex items-center justify-between mb-2">
                                <p className="block font-sans font-semibold text-base antialiased leading-relaxed text-blue-gray-900" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    {books.title}
                                </p>
                            </div>
                        </div>
                        <div className="p-6 pt-0 flex flex-row justify-between flex-1">
                            <a href={books.linkReading}>
                                <button
                                className=" mr-2 justify-end align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-black text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                type="button">
                                Read
                            </button></a>
                                <button onClick={() => dispatch(handleDelete(books.id))}
                                className="ml-1 justify-end align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-black text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                type="button">
                                Done
                            </button>
                        </div>
                    </div>
                 ))}
            </div>
        </>
    )
}