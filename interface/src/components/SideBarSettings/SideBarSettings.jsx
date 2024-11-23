import { MdManageAccounts, MdAdminPanelSettings } from 'react-icons/md';
import styles from './SideBarSettings.module.css';
function SideBarSettings() {
    return (
        <>
            <div
                className=' d-flex flex-column flex-shrink-0 p-3 border border-top-0  bg-success_custom '
                style={{ width: '280px', height: '100vh' }}
            >
                <ul className='nav nav-pills flex-column'>
                    <li>
                        <a
                            href='#'
                            className={
                                styles['text_custom'] +
                                '  nav-link fw-bolder border-bottom border-success '
                            }
                        >
                            <MdManageAccounts />
                            Tài Khoản
                        </a>
                    </li>
                    <li className='mt-3'>
                        <a
                            href='#'
                            className={
                                styles['text_custom'] +
                                '  nav-link fw-bolder border-bottom border-success '
                            }
                        >
                            <MdAdminPanelSettings />
                            Thông Tin Cá Nhân
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}
export default SideBarSettings;
