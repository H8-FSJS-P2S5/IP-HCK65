import './signup.css';

export default function Signup() {
    return (
        <div className="fixed bottom-0 signup_bar flex py-4 px-2 justify-between text-sm">
            <div>
                <p className='mb-2 font-bold'>
                    Preview on Spotify
                </p>
                <p className='font-semibold'>
                    Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
                </p>
            </div>
            <button className="rounded-full text-black mt-4 px-8 py-0 bg-white font-semibold">
                Sign up
            </button>
        </div>
    )
}