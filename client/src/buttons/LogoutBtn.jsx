import { useNavigate } from "react-router-dom"

export default function LogoutButton() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        navigate('/login')
    }
    return (
        <button
            onClick={handleLogout}
            className="rounded-full text-base text-black px-8 py-2 bg-primary font-semibold hover:scale-105 duration-300"
        >
            Logout
        </button>
    )
}