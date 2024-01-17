import Tooltip from '@mui/material/Tooltip';

import * as React from 'react';

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
