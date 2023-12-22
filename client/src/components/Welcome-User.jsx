import NavbarUser from "./Navbar-User";

export default function Welcome() {

    return (
        <>
            <div className="flex justify-center mt-2">
                <div className="hero min-h-[450px] rounded-lg w-full max-w-screen-xl mx-auto px-6 py-3" style={{ backgroundImage: 'url(https://i.pinimg.com/564x/c9/86/f2/c986f2e060adf94b05f120e87c518eba.jpg)' }}>
                    <div className="hero-overlay bg-opacity-60 rounded-lg"></div>
                    <div className="hero-content text-center text-neutral-content flex flex-col justify-center">
                        <div className="mt-40 max-w-md mx-auto">
                            <h1 className="mb-5 text-5xl text-white font-bold">WELCOME!</h1>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
