import { ListItemButton, ListItemSecondaryAction, ListItemText,} from '@mui/material';
import React from 'react';

import { Label, } from '../Label';

export const Preference = ({
    enabled = true,
    title,
    description,
    secondaryAction,
    onClick,
} : {
    enabled?         : boolean,
    title?           : string,
    description?     : string,
    secondaryAction? : React.ReactNode,
    onClick?         : () => void,
}) => {
    const handleClick = () => enabled && onClick ? onClick() : undefined;

    return (
        <ListItemButton
            role='listitem'
            onClick={handleClick}>
            <ListItemText
                primary={<Label color={enabled ? 'primary' : 'secondary'}>{title}</Label>}
                secondary={description}
                secondaryTypographyProps={{
                    noWrap : true,
                }} />
            {secondaryAction && (
                <ListItemSecondaryAction>
                    {secondaryAction}
                </ListItemSecondaryAction>
            )}
        </ListItemButton>
    );
};
