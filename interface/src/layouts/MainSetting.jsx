import { Header } from '@mainlayout';
import SideBarSettings from '@components/SideBarSettings/SideBarSettings';
import { Outlet } from 'react-router-dom';
import style from './MainSetting.module.css';
function MainSetting() {
    return (
        <>
            <Header />
            <div className={style['main-container']}>
                <SideBarSettings className={style['SideBarSettings']} />
                <div className={style['content']}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default MainSetting;
