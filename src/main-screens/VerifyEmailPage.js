import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import BASE_API_URI from "../config";

const VerifyEmailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        const verifyEmail = async () => {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');
            if (!token) {
                alert('No token provided');
                navigate('/');
                return;
            }
            try {
                const response = await axios.get(`${BASE_API_URI}/verify-email?token=${token}`);
                if (response.status === 200) {
                    navigate('/registration-confirmation');
                } else {
                    alert(response.data.message || 'Failed to verify email');
                    navigate('/');
                }
            } catch (error) {
                console.error('Failed to verify email:', error);
                alert('An error occurred while verifying your email. Please try again.');
                navigate('/');
            }
        };
        verifyEmail();
    }, [navigate, location.search]);

    return (
        <div>Loading...</div>
    );
};

export default VerifyEmailPage;
