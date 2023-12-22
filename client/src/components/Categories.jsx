import { TbBrandJavascript, TbFileStack, TbBrandNodejs } from "react-icons/tb";
import { SiTailwindcss } from "react-icons/si";
import { IoLogoReact } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setSearch } from "../features/search/searchSlice";

export default function Categories() {

    const dispatch = useDispatch()

    const handleSearch = (Categories) => {
        dispatch(setSearch(Categories))
    }

    return (
        <>
            <div className="max-w-screen-xl px-6 py-3 mx-auto place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible" >
                <div className="relative right-0">
                    <ul className="relative flex flex-wrap p-1 list-none rounded-lg bg-black text-white" data-tabs="tabs" role="list">
                        <li className="z-30 flex-auto text-center">
                          
                                <a onClick ={() => handleSearch('programmer fullstack')} className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit hover:bg-white hover:text-black"
                                    data-tab-target="" active role="tab" aria-selected="true">
                                    <TbFileStack className="w-8 h-8" />
                                    <span  className="ml-1">All List</span>
                                </a>
                        </li>
                        <li className="z-30 flex-auto text-center">
                            <a onClick ={() => handleSearch('Javascript')} className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit  hover:bg-white hover:text-black"
                                data-tab-target="" role="tab" aria-selected="false">
                                <TbBrandJavascript className="w-8 h-8" />
                                <span className="ml-1">Javascript</span>
                            </a>
                        </li>
                        <li className="z-30 flex-auto text-center">
                            <a onClick ={() => handleSearch('Node')} type="button" className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit hover:bg-white hover:text-black"
                                data-tab-target="" role="tab" aria-selected="false">
                                <TbBrandNodejs className="w-8 h-8" />
                                <span className="ml-1">Node Js</span>
                            </a>
                        </li>
                        <li className="z-30 flex-auto text-center">
                            <a onClick ={() => handleSearch('Tailwind')} className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit hover:bg-white hover:text-black"
                                data-tab-target="" role="tab" aria-selected="true">
                                <SiTailwindcss className="w-8 h-8" />
                                <span className="ml-1">Tailwind</span>
                            </a>
                        </li>
                        <li className="z-30 flex-auto text-center">
                            <a onClick ={() => handleSearch('React')} className="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit hover:bg-white hover:text-black"
                                data-tab-target="" role="tab" aria-selected="true">
                                <IoLogoReact className="w-8 h-8" />
                                <span className="ml-1">React</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}