import { Dialog, DialogTitle, DialogContent, Fab, IconButton, styled, } from '@mui/material';
import { Add, Check, Delete, } from '@mui/icons-material';
import React, { useState, } from 'react';
import { useTranslation, } from 'react-i18next';

import { SelectList, SuggestPlaceInput, } from '../components';
import { useAppDispatch, useAppSelector, } from '../hooks';
import { Place, } from '../models';
import { setPlaces, setSelectedPlace, } from '../redux';

import { Screen, } from './Screen';

const StyledFab = styled(Fab)`
    margin  : 0;
    left    : auto;
    right   : 16px;
    top     : auto;
    bottom  : 16px;
    position : fixed;
`;

export const Locations = () => {
    const dispatch = useAppDispatch();

    const { t, } = useTranslation();

    const [ open, setOpen, ] = useState<boolean>(false);

    const { places, selectedPlace, } = useAppSelector(state => state.settings);

    const handleSelect = (value : string) => {
        dispatch(setSelectedPlace(places.find((place : Place) => place.name === value)));
    };

    const handleSecondaryAction = (value : string) => {
        dispatch(setPlaces([
            ...places.splice(places.findIndex((place : Place) => place.name === value), 1),
        ]));
    };

    const handleAdd = () => setOpen(true);

    const handleClose = () => setOpen(false);

    return (
        <Screen title={t('locations')}>
            <SelectList
                icon={<Check />}
                data={places.map((place : Place) => place.name)}
                value={selectedPlace.name}
                secondaryAction={places.length > 1 ? <IconButton><Delete /></IconButton> : undefined}
                onSelect={handleSelect}
                onSecondaryAction={handleSecondaryAction} />
            <StyledFab
                color='primary'
                onClick={handleAdd}>
                <Add />
            </StyledFab>
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}>
                <DialogTitle>{t('add_location')}</DialogTitle>
                <DialogContent>
                    <SuggestPlaceInput
                        hint={t('add_location_hint')}
                        onClose={handleClose} />
                </DialogContent>
            </Dialog>
        </Screen>
    );
};
