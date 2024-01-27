import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

export const ContextMenuTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))`
    & .MuiTooltip-tooltip {
        color: 'rgba(0, 0, 0, 0.87)',
        width: '5vh',
        height: '5vh'
    }
`;
