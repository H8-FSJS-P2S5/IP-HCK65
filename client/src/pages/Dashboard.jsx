import useAuth from "../hooks/useAuth"

export default function Dashboard({code}) {
    const accessToken = useAuth(code)
    return(
        <>
        <h1 className="text-2xl font-bold"> Dashboard</h1>
        <h1 className="text-2xl font-bold"> {code}</h1>
        </>
    )
}