import React from 'react';
import {shallow, mount} from 'enzyme';

import SignupHelp from './signup-help';

describe('<SignupHelp />', () => {
    it('Renders without crashing', () => {
        shallow(<SignupHelp />);
    });
});