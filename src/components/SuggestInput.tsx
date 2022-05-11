import { Autocomplete, AutocompleteChangeReason, TextField, } from '@mui/material';
import React, { useEffect, useState, } from 'react';

import { useDebounce, } from '../hooks';

export const SuggestInput = ({
    hint,
    suggestions = [],
    onChange,
    onSelect,
} : {
    hint?        : string,
    suggestions? : string[],
    onChange?    : (value : string) => void,
    onSelect?    : (value : string) => void,
}) => {
    const [ value, setValue, ] = useState<string>('');

    const debouncedValue = useDebounce(value);

    const handleChange = (event : React.SyntheticEvent, newValue : any, reason : AutocompleteChangeReason) => onSelect && reason === 'selectOption' && newValue && onSelect(newValue);

    const handleTextChange = ((event : any) => setValue(event.target.value));

    const Input = (props : any) => (
        <TextField
            {...props}
            role='textbox'
            fullWidth
            margin='dense'
            variant='standard'
            placeholder={hint}
            onChange={handleTextChange} />
    );

    useEffect(() => onChange && onChange(debouncedValue), [ debouncedValue, ]);

    return (
        <Autocomplete
            role='searchbox'
            autoComplete
            clearOnEscape
            disableListWrap
            freeSolo
            includeInputInList
            options={suggestions}
            renderInput={Input}
            onChange={handleChange} />
    );
};
