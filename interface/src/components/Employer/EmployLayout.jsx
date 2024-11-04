import { useEffect, useState } from 'react';
import {
    FaBars,
    FaBell,
    FaShoppingCart,
    FaUser,
    FaChartLine,
    FaBriefcase,
    FaCog,
    FaHome,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '@images/logo-birthday-10.09ebdc6.png';
import './styles.css';

const EmployerLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeLink, setActiveLink] = useState(
        sessionStorage.getItem('activeLink') || '/employer'
    );

    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

    const handleLinkClick = (link) => {
        setActiveLink(link);
        sessionStorage.setItem('activeLink', link);
    };

    useEffect(() => {
        const savedLink = sessionStorage.getItem('activeLink');
        if (savedLink) {
            setActiveLink(savedLink);
        }
    }, []);

    return (
        <div className='employer-layout d-flex'>
            {/* Header */}
            <header className='header navbar navbar-expand-lg navbar-dark fixed-top'>
                <button className='btn text-white me-2' onClick={toggleSidebar}>
                    <FaBars />
                </button>
                <Link to='/' className='navbar-brand d-flex align-items-center'>
                    <img src={logo} alt='Logo' height='40' className='me-2' />
                </Link>
                <div className='header-icons d-flex align-items-center'>
                    <button className='bg-transparent border-0'>
                        <FaBell className='text-white mx-2' />
                    </button>
                    <button className='bg-transparent border-0'>
                        <FaShoppingCart className='text-white mx-2' />
                    </button>
                    <button className='bg-transparent border-0'>
                        <FaUser className='text-white mx-2' />
                    </button>
                </div>
            </header>

            <aside
                className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}
            >
                <nav className='nav flex-column pt-4'>
                    <Link
                        to='/employer'
                        className={`nav-link ${
                            activeLink === '/employer' ? 'active' : ''
                        }`}
                        onClick={() => handleLinkClick('/employer')}
                    >
                        <FaChartLine className='icon' />
                        <span className='link-text fw-bolder'>
                            Quản lý bài tuyển dụng
                        </span>
                    </Link>
                    <Link
                        to='/employer/job-post-manage'
                        className={`nav-link ${
                            activeLink === '/employer/job-post-manage'
                                ? 'active'
                                : ''
                        }`}
                        onClick={() =>
                            handleLinkClick('/employer/job-post-manage')
                        }
                    >
                        <FaBriefcase className='icon' />
                        <span className='link-text fw-bolder'>
                            Quản lý hồ sơ ứng viên
                        </span>
                    </Link>
                    <Link
                        to='/employer/settings'
                        className={`nav-link ${
                            activeLink === '/employer/settings' ? 'active' : ''
                        }`}
                        onClick={() => handleLinkClick('/employer/settings')}
                    >
                        <FaCog className='icon' />
                        <span className='link-text fw-bolder'>
                            Đăng bài tuyển dụng
                        </span>
                    </Link>
                    <Link
                        to='/'
                        className={`nav-link`}
                        onClick={() => handleLinkClick('/employer')}
                    >
                        <FaHome className='icon' />
                        <span className='link-text fw-bolder'>
                            Xem bảng tin
                        </span>
                    </Link>
                </nav>
            </aside>
        </div>
    );
};

export default EmployerLayout;
