import React from 'react';

import { render, } from '../../utils/test';

import { PreferenceSubheader, } from './PreferenceSubheader';

describe('<PreferenceSubheader />', () => {
    it('renders correctly', () => {
        expect(render(<PreferenceSubheader title='dummy' />).asFragment()).toMatchSnapshot();
    });
});
