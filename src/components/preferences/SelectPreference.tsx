import { Dialog, DialogTitle, } from '@mui/material';
import { Check, } from '@mui/icons-material';
import React, { useState, } from 'react';

import { SelectList, } from '../SelectList';

import { Preference, } from './Preference';

export const SelectPreference = ({
    data,
    value,
    onSelect,
    ...rest
} : {
    data?             : any[],
    value?            : any,
    onSelect?         : (item : any) => void,
    [ rest : string ] : any,
}) => {
    const [ open, setOpen, ] = useState<boolean>(false);

    const handleClick = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleSelect = (item : any) => {
        setOpen(false);

        if (onSelect) onSelect(item);
    };

    return (
        <React.Fragment>
            <Preference
                {...rest}
                onClick={handleClick} />
            <Dialog
                open={open}
                onClose={handleClose}>
                {rest?.title && (
                    <DialogTitle>{rest?.title}</DialogTitle>
                )}
                <SelectList
                    icon={<Check />}
                    data={data}
                    value={value}
                    onSelect={handleSelect} />
            </Dialog>
        </React.Fragment>
    );
};
