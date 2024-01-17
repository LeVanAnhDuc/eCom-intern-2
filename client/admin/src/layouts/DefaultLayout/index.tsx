import { ReactNode } from 'react';
import Divider from '@mui/material/Divider';

import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import SpeedDial from '../../components/SpeedDial';

interface DefaultLayoutProps {
    children: ReactNode;
}
function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div className="flex bg-primary-50 dark:bg-primary-400">
            <div className="sticky top-0 h-screen w-fit">
                <SideBar />
            </div>
            <div className="flex flex-col h-full relative w-full">
                <Header />
                <Divider variant="middle" />
                <div className="w-full p-5 overflow-y-auto scroll-smooth">{children}</div>
                <SpeedDial />
            </div>
        </div>
    );
}

export default DefaultLayout;
