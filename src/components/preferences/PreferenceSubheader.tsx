import { Divider, ListSubheader, } from '@mui/material';
import React from 'react';

import { Label, } from '../Label';

export const PreferenceSubheader = ({
    title,
    divider,
} : {
    title    : string,
    divider? : boolean,
}) => (
    <React.Fragment>
        {divider && <Divider />}
        <ListSubheader role='heading'>
            <Label variant='caption'>{title}</Label>
        </ListSubheader>
    </React.Fragment>
);
