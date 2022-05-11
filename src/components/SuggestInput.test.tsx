import user from '@testing-library/user-event';
import React from 'react';

import { act, fireEvent, render, } from '../utils/test';

import { SuggestInput, } from './SuggestInput';

describe('<SuggestInput />', () => {
    it('triggers onChange and onSelect events correctly', async () => {
        const handleChange = jest.fn();
        const handleSelect = jest.fn();

        const { getByRole, getByText, } = render(
            <SuggestInput
                suggestions={[
                    'Line 1',
                    'Line 2',
                ]}
                onChange={handleChange}
                onSelect={handleSelect} />
        );

        await act(async () => {
            await user.type(getByRole('textbox'), 'L');

            await new Promise(resolve => setTimeout(resolve, 500));
        });

        expect(handleChange).toHaveBeenCalledTimes(2);
        expect(handleChange).toHaveBeenLastCalledWith('L');

        fireEvent.click(getByText('Line 1'));

        expect(handleSelect).toHaveBeenCalledTimes(1);
        expect(handleSelect).toHaveBeenCalledWith('Line 1');
    });
});
