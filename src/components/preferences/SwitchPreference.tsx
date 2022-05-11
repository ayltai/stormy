import { Switch, } from '@mui/material';
import React from 'react';

import { Preference, } from './Preference';

export const SwitchPreference = ({
    checked,
    onChange,
    ...rest
} : {
    checked?         : boolean,
    onChange?        : (value : boolean) => void,
    [ rest : string] : any,
}) => (
    <Preference
        {...rest}
        secondaryAction={
            <Switch
                color='secondary'
                checked={checked}
                onChange={(event, value) => onChange && onChange(value)} />
        } />
);
