import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate()
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const query = new URLSearchParams(location.search);
                const token = query.get('token');

                if (token) {
                    await Axios.get(`http://localhost:3000/users/verify-email?token=${token}`);
                    console.log('Email verified successfully');
                    navigate('/login')
                }
            } catch (error) {
                console.error('Error verifying email:', error);
            }
        };

        verifyEmail();
    }, [location]);

    return <div>Verifying Email...</div>;
};

export default VerifyEmail;
