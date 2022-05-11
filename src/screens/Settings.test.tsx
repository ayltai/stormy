import React from 'react';

import { store, } from '../redux';
import { act, fireEvent, render, } from '../utils/test';

import { Settings, } from './Settings';

describe('<Settings />', () => {
    it('changes "refresh interval" setting correctly', () => {
        const { getAllByRole, getByText, queryByText, } = render(<Settings />, {
            store,
        });

        expect(queryByText('pref_refresh_interval_desc{"refreshInterval":15}')).toBeNull();

        act(() => {
            fireEvent.click(getAllByRole('listitem')[1]);
        });

        act(() => {
            fireEvent.click(getByText('15'));
        });

        expect(getByText('pref_refresh_interval_desc{"refreshInterval":15}')).toBeInTheDocument();
    });
});
