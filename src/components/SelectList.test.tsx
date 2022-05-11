import { Check, } from '@mui/icons-material';
import React from 'react';

import { fireEvent, render, } from '../utils/test';

import { SelectList, } from './SelectList';

const DATA = [
    'Line 1',
    'Line 2',
];

describe('<SelectList />', () => {
    it('renders correctly', () => {
        const { getByText, } = render(
            <SelectList
                icon={<Check />}
                data={DATA}
                value={DATA[0]} />
        );

        expect(getByText(DATA[0])).toBeInTheDocument();
        expect(getByText(DATA[1])).toBeInTheDocument();
    });

    it('triggers onSelect when selected', () => {
        const handleSelect = jest.fn();

        const { getByText, } = render(
            <SelectList
                icon={<Check />}
                data={DATA}
                value={DATA[0]}
                secondaryAction='dummy'
                onSelect={handleSelect} />
        );

        fireEvent.click(getByText(DATA[0]));

        expect(handleSelect).toBeCalledTimes(1);
    });

    it('triggers onSecondaryAction when secondaryAction is clicked', () => {
        const handleSecondaryAction = jest.fn();

        const { getAllByText, } = render(
            <SelectList
                icon={<Check />}
                data={DATA}
                value={DATA[0]}
                secondaryAction='dummy'
                onSecondaryAction={handleSecondaryAction} />
        );

        fireEvent.click(getAllByText('dummy')[0]);

        expect(handleSecondaryAction).toBeCalledTimes(1);
    });
});
