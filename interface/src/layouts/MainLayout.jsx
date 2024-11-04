import {Header,Wellcome,Footer,Recommend} from '@mainlayout'
import { Outlet } from 'react-router-dom';

function MainLayout() {
    return <>
    <Header />
    <Wellcome/>
    <Outlet />
    <Recommend/>
    <Footer/>
    </>;
}

export default MainLayout;