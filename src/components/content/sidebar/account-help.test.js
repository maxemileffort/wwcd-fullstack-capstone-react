import React from 'react';
import {shallow, mount} from 'enzyme';

import AccountHelp from './account-help';

describe('<AccountHelp />', () => {
    it('Renders without crashing', () => {
        shallow(<AccountHelp />);
    });
});