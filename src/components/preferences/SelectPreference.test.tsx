import React from 'react';

import { fireEvent, render, } from '../../utils/test';

import { SelectPreference, } from './SelectPreference';

const DATA = [
    'Line 1',
    'Line 2',
];

describe('<SelectPreference />', () => {
    it('renders correctly', () => {
        const handleSelect = jest.fn();

        const { getByText, queryByRole, } = render(
            <SelectPreference
                title='dummy'
                data={DATA}
                value={DATA[0]}
                onSelect={handleSelect} />
        );

        expect(queryByRole('dialog')).toBeNull();

        fireEvent.click(getByText('dummy'));

        expect(queryByRole('dialog')).toBeInTheDocument();

        fireEvent.click(getByText(DATA[0]));

        expect(handleSelect).toHaveBeenCalledTimes(1);
        expect(handleSelect).toHaveBeenCalledWith(DATA[0]);
    });
});
