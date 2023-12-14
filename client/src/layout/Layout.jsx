import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";


export default function Layout() {
    return (
        <div className="flex gap-2">
            <Sidebar/>
            <div className="w-3/4 absolute -z-10 right-0 top-0">
            <Outlet />
            </div>
        </div>
    )
}