import EmployerLay from '@employerlayout/EmployLayout.jsx';
import { Outlet } from 'react-router-dom';
import '@employerlayout/styles.css';
function EmployerLayout() {
    return (
        <>
            <EmployerLay />
            <main className={`content `}>
                <Outlet />
            </main>
        </>
    );
}

export default EmployerLayout;
