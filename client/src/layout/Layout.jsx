import { Outlet } from "react-router-dom";
import SidebarPage from "../component/Sidebar";

export default function LayoutPage() {
    return (
        <>
            <div className="flex flex-col md:flex-row">
            <SidebarPage />
            <Outlet />
            </div>
        </>
    )
}
