import { Link } from 'react-router-dom';
import './footer.css';

export default function Footer() {
    return (
        <div className="fixed bottom-0 signup_bar flex py-4 px-2 justify-between text-sm">
            <div>
                <p className='mb-2 font-bold'>
                    Preview on Pitch+
                </p>
                <p className='font-semibold'>
                    Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
                </p>
            </div>
            <Link to='/signup' className="rounded-full text-black mt-4 px-8 py-2 bg-white font-semibold">
                Sign up
            </Link>
        </div>
    )
}