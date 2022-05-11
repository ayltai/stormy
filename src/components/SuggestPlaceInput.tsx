import { QueryStatus, } from '@reduxjs/toolkit/query/react';
import React, { useEffect, useState, } from 'react';

import { useGetAutocompleteQuery, } from '../apis';
import { useAppDispatch, useAppSelector, } from '../hooks';
import { Item, } from '../models';
import { setPlaces, } from '../redux';
import { handleError, } from '../utils';

import { SuggestInput, } from './SuggestInput';

export const SuggestPlaceInput = ({
    hint,
    onClose,
} : {
    hint?    : string,
    onClose? : () => void,
}) => {
    const dispatch = useAppDispatch();

    const [ value,       setValue,       ] = useState<string>('');
    const [ suggestions, setSuggestions, ] = useState<string[]>([]);
    const [ locations,   setLocations,   ] = useState<Item[]>([]);

    const places = useAppSelector(state => state.settings.places);

    const { data, error, status, } = useGetAutocompleteQuery(value, {
        skip : !value,
    });

    const handleChange = (newValue : string) => {
        setValue(newValue);
    };

    const handleSelect = (newValue : string) => {
        const location = locations[suggestions.indexOf(newValue)];

        dispatch(setPlaces([
            ...places,
            {
                name      : location.address.label,
                latitude  : location.position?.lat,
                longitude : location.position?.lng,
            },
        ]));

        onClose?.();
    };

    useEffect(() => {
        if (!value) {
            setLocations([]);
            setSuggestions([]);
        }
    }, [ value, ]);

    useEffect(() => {
        if (data && data.items && data.items.length && status === QueryStatus.fulfilled) {
            setLocations(data.items);
            setSuggestions(data.items.map(item => item.address.label));
        }
    }, [ data, status, ]);

    useEffect(() => {
        if (error) handleError(error);
    }, [ error, ]);

    return (
        <SuggestInput
            hint={hint}
            suggestions={suggestions}
            onChange={handleChange}
            onSelect={handleSelect} />
    );
};
