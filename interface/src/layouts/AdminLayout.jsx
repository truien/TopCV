import AdminHeaderSidebar from '@adminlayout/AdminHeaderSidebar';
import { Outlet } from 'react-router-dom';
import '@adminlayout/styles.css'

function Adminlayout() {
    return (
        <>
            <AdminHeaderSidebar />
            <main className={`content `}>
                <Outlet />
            </main>
        </>
    );
}

export default Adminlayout;
