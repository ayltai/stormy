import { AppBar, IconButton, styled, Toolbar, } from '@mui/material';
import { ArrowBackIosNew, } from '@mui/icons-material';
import React from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';

const StyledIconButton = styled(IconButton)`
    cursor : pointer;
`;

export const TitleBar = ({
    children,
} : {
    children? : React.ReactNode,
}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleBack = () => navigate(-1);

    return (
        <AppBar position='sticky'>
            <Toolbar variant='dense'>
                {location.pathname !== '/' && (
                    <StyledIconButton
                        edge='start'
                        onClick={handleBack}>
                        <ArrowBackIosNew />
                    </StyledIconButton>
                )}
                {children}
            </Toolbar>
        </AppBar>
    );
};
