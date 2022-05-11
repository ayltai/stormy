import React from 'react';

import { store, } from '../redux';
import { fireEvent, render, } from '../utils/test';

import { Locations, } from './Locations';

describe('<Locations />', () => {
    it('shows SuggestInput component when Add button is clicked', () => {
        const { getAllByRole, getByText, queryByText, } = render(<Locations />, {
            store,
        });

        expect(queryByText('add_location')).toBeNull();

        fireEvent.click(getAllByRole('button')[0]);

        expect(getByText('add_location')).toBeInTheDocument();
    });
});
