import { useState } from 'react';
import {
    FaBars,
    FaBell,
    FaShoppingCart,
    FaUser,
    FaChartLine,
    FaBriefcase,
    FaCog,
} from 'react-icons/fa';
import logo from '@images/logo-birthday-10.09ebdc6.png';
import './styles.css';

const AdminLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [activeLink, setActiveLink] = useState('/');

    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

    const handleLinkClick = (link) => setActiveLink(link);

    return (
        <div className='admin-layout d-flex'>
            {/* Header */}
            <header className='header navbar navbar-expand-lg navbar-dark fixed-top'>
                <button className='btn text-white me-2' onClick={toggleSidebar}>
                    <FaBars />
                </button>
                <a href='/' className='navbar-brand d-flex align-items-center'>
                    <img src={logo} alt='Logo' height='40' className='me-2' />
                </a>
                <div className='header-icons d-flex align-items-center'>
                    <button className='bg-transparent border-0'><FaBell className='text-white mx-2' /></button>
                    <button className='bg-transparent border-0'><FaShoppingCart className='text-white mx-2' /></button>
                    <button className='bg-transparent border-0'><FaUser className='text-white mx-2' /></button>
                </div>
            </header>

           
            <aside
                className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}
            >
                <nav className='nav flex-column pt-4'>
                    <a
                        href=''
                        className={`nav-link ${
                            activeLink === '/' ? 'active' : ''
                        }`}
                        onClick={() => handleLinkClick('/')}
                    >
                        <FaChartLine className='icon' />{' '}
                        <span className='link-text'>Quản lý tài khoản</span>
                    </a>
                    <a
                        href='#jobs'
                        className={`nav-link ${
                            activeLink === '#jobs' ? 'active' : ''
                        }`}
                        onClick={() => handleLinkClick('#jobs')}
                    >
                        <FaBriefcase className='icon' />{' '}
                        <span className='link-text'>Quản lý bài tuyển dụng </span>
                    </a>
                    <a
                        href='#settings'
                        className={`nav-link ${
                            activeLink === '#settings' ? 'active' : ''
                        }`}
                        onClick={() => handleLinkClick('#settings')}
                    >
                        <FaCog className='icon' />{' '}
                        <span className='link-text'>Cài đặt tài khoản</span>
                    </a>
                </nav>
            </aside>
        </div>
    );
};

export default AdminLayout;
