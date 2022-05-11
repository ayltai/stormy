import { styled, Tooltip, Typography, useTheme, } from '@mui/material';
import React from 'react';

const StyledLabel = styled(Typography)`
    padding     : ${({ theme, }) => theme.spacing(1)}px;
    text-shadow : 0 0 3px ${({ theme, }) => theme.palette.background.paper};
    user-select : none;
`;

export const Label = ({
    tooltip,
    color = 'primary',
    children,
    ...rest
} : {
    tooltip?          : string,
    color?            : 'primary' | 'secondary',
    children          : React.ReactNode,
    [ rest : string ] : any,
}) => {
    const theme = useTheme();

    return (
        <Tooltip title={tooltip || ''}>
            <StyledLabel
                {...rest}
                color={theme.palette.text[color]}>
                {children}
            </StyledLabel>
        </Tooltip>
    );
};
