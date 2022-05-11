import { List, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText,} from '@mui/material';
import React from 'react';

import { Label, } from './Label';

export const SelectList = ({
    data,
    icon,
    value,
    secondaryAction,
    onSelect,
    onSecondaryAction,
} : {
    icon               : React.ReactNode,
    data?              : any[],
    value?             : any,
    secondaryAction?   : React.ReactNode,
    onSelect?          : (item : any) => void,
    onSecondaryAction? : (item : any) => void,
}) => (
    <List role='list'>
        {data && data.map((item, index) => {
            const handleSelect          = () => onSelect && onSelect(item);
            const handleSecondaryAction = () => onSecondaryAction && onSecondaryAction(item);

            return (
                <ListItemButton
                    key={index}
                    role='listitem'
                    onClick={handleSelect}>
                    {value === item && (
                        <ListItemIcon>{icon}</ListItemIcon>
                    )}
                    <ListItemText
                        inset={value && value !== item}
                        primary={
                            <Label
                                noWrap
                                tooltip={item}>
                                {item}
                            </Label>
                        } />
                    {secondaryAction && (
                        <ListItemSecondaryAction
                            role='button'
                            onClick={handleSecondaryAction}>
                            {secondaryAction}
                        </ListItemSecondaryAction>
                    )}
                </ListItemButton>
            );
        })}
    </List>
);
