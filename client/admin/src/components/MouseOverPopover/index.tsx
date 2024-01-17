import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';

interface Iprops {
    children: React.ReactNode;
    content: string;
}

export default function MouseOverPopover(props: Iprops) {
    const { children, content } = props;

    return (
        <Tooltip title={content} placement={'bottom'} arrow>
            <span>{children}</span>
        </Tooltip>
    );
}
