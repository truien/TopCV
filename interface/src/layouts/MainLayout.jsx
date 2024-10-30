import {Header,Wellcome,Footer} from '@mainlayout'
import { Outlet } from 'react-router-dom';

function MainLayout() {
    return <>
    <Header />
    <Wellcome/>
    <Outlet />
    <Footer/>
    </>;
}

export default MainLayout;