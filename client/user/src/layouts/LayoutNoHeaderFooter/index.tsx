import SpeedDial from '../../components/SpeedDial';

import { ReactNode, FunctionComponent } from 'react';

export interface LayoutNoHeaderFooterProps {
    children: ReactNode;
}

const LayoutNoHeaderFooter: FunctionComponent<LayoutNoHeaderFooterProps> = ({ children }) => {
    return (
        <>
            <div className="text-base pt-18 min-h-screen">{children}</div>
            <SpeedDial />
        </>
    );
};

export default LayoutNoHeaderFooter;
