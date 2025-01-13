import { Link, useNavigate } from 'react-router-dom';
import logo from '@images/topcv-logo-10-year.png';
import avatarDefault from '@images/avatar-default.jpg';
import './styles.css';
import { useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');
    const avatar = sessionStorage.getItem('avatar');
    const userType = sessionStorage.getItem('userType');
    const displayAvatar = avatar || avatarDefault;
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/sign');
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userType');
        sessionStorage.removeItem('avatar');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('activeLink');
        navigate('/');
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav
            className='navbar navbar-expand-lg navbar-light px-3'
            role='navigation'
        >
            <div className='container-fluid'>
                <span className='navbar-brand'>
                    <img src={logo} alt='Logo' style={{ height: '72px' }} />
                </span>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div
                    className='collapse navbar-collapse d-flex justify-content-between'
                    id='navbarNav'
                >
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <Link
                                to='/'
                                className='nav-link nav-link_custom custom-text'
                            >
                                Trang chủ
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/jobs'
                                className='nav-link nav-link_custom custom-text'
                            >
                                Tìm việc
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/employers'
                                className='nav-link nav-link_custom custom-text'
                            >
                                Nhà tuyển dụng
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/create-cv'
                                className='nav-link nav-link_custom custom-text'
                            >
                                Tạo CV
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/resources'
                                className='nav-link nav-link_custom custom-text'
                            >
                                Tài nguyên
                            </Link>
                        </li>
                        {userType === 'Admin' && (
                            <li className='nav-item'>
                                <Link
                                    to='/admin'
                                    className='nav-link nav-link_custom custom-text'
                                >
                                    Quản lý
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className='d-flex me-3'>
                        {userType ? (
                            <div
                                className='position-relative'
                                onMouseEnter={toggleDropdown}
                                onMouseLeave={toggleDropdown}
                            >
                                <img
                                    src={displayAvatar}
                                    alt='Avatar'
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                    }}
                                    className='avatar'
                                />
                                {showDropdown && (
                                    <div
                                        className='dropdown-menu'
                                        style={{
                                            position: 'absolute',
                                            right: '0',
                                            zIndex: '1000',
                                        }}
                                    >
                                        {username !== 'admin' ? (
                                            <Link
                                                to='/account-settings'
                                                className='dropdown-item'
                                            >
                                                Cài đặt tài khoản
                                            </Link>
                                        ) : (
                                            <div></div>
                                        )}

                                        <button
                                            onClick={handleLogout}
                                            className='dropdown-item'
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={handleLogin}
                                    className='btn btn-outline-custom me-2'
                                >
                                    Đăng nhập
                                </button>
                                <button
                                    onClick={handleRegister}
                                    className='btn btn-primary-custom'
                                >
                                    Đăng ký
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
