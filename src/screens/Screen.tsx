import { Box, Typography, useTheme, } from '@mui/material';
import React from 'react';

import { TitleBar, } from '../components';

export const Screen = ({
    title,
    children,
} : {
    title?    : string,
    children? : React.ReactNode,
}) => {
    const theme = useTheme();

    return (
        <Box
            minHeight='100vh'
            display='flex'
            flexDirection='column'
            bgcolor={theme.palette.background.paper}>
            <TitleBar>
                <Typography variant="h6">{title}</Typography>
            </TitleBar>
            <Box flexGrow={1}>
                {children}
            </Box>
        </Box>
    );
};
