import { IconButton, styled, Tooltip, } from '@mui/material';
import React from 'react';

const StyledIconButton = styled(IconButton)`
    padding : ${({ theme, }) => theme.spacing(1)}px;
`;

export const Action = ({
    tooltip,
    icon,
    onClick,
} : {
    tooltip? : string,
    icon     : React.ReactNode,
    onClick  : () => void,
}) => (
    <Tooltip title={tooltip || ''}>
        <StyledIconButton
            role='button'
            disableFocusRipple
            onClick={onClick}>
            {icon}
        </StyledIconButton>
    </Tooltip>
);
