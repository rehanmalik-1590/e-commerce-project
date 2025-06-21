import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Clear sessionStorage and cookies manually
        sessionStorage.removeItem('userInfo');
        Cookies.remove('userInfo');

        dispatch(logout());
        toast.success('Logged out successfully');
        navigate('/login');
    }, [dispatch, navigate]);

    return null;
};

export default Logout;
