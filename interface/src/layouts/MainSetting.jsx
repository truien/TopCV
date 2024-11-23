import { Header } from '@mainlayout';
import SideBarSettings from '@components/SideBarSettings/SideBarSettings';
import { Outlet } from 'react-router-dom';
function MainSetting() {
    return (
        <>
            <Header />
            <SideBarSettings/>
            <Outlet />
        </>
    );
}

export default MainSetting;
