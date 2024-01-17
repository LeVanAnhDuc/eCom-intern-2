import { ReactNode } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SpeedDial from '../../components/SpeedDial';

interface DefaultLayoutProps {
    children: ReactNode;
}

function DefaultLayoutNoAnimation({ children }: DefaultLayoutProps) {
    return (
        <>
            <Header />
            <div className="min-h-screen w-full">{children}</div>
            <SpeedDial />
            <Footer />
        </>
    );
}

export default DefaultLayoutNoAnimation;
