import { MdManageAccounts, MdAdminPanelSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './SideBarSettings.module.css';
function SideBarSettings() {
    const [active, setActive] = useState('account');
    const handleClick = (id) => {
        setActive(id);
    };
    return (
        <>
            <div
                className=' d-flex flex-column flex-shrink-0 p-3 border border-top-0  bg-success_custom '
                style={{ width: '280px', height: '100vh' }}
            >
                <ul className='nav  flex-column'>
                    <Link
                        to='/account-settings'
                        className={
                            active === 'account'
                                ? styles['text_custom__ativite'] +
                                ' nav-link fw-bolder border-bottom border-success'
                                : styles['text_custom'] +
                                ' nav-link fw-bolder border-bottom border-success'
                        }
                        onClick={() => handleClick('account')}
                    >
                        <div>
                            <MdManageAccounts />
                            Tài Khoản
                        </div>
                    </Link>
                    <Link
                        to='settings-infor'
                        className={
                            active === 'infor' 
                                ? styles['text_custom__ativite'] + ' mt-3 nav-link fw-bolder border-bottom border-success' 
                                : styles['text_custom'] + ' mt-3 nav-link fw-bolder border-bottom border-success'
                        }
                        onClick={() => handleClick('infor')}
                    >
                        <div>
                            <MdAdminPanelSettings />
                            Thông Tin Cá Nhân
                        </div>
                    </Link>
                </ul>
            </div>
        </>
    );
}
export default SideBarSettings;
