import React from 'react';
import {shallow, mount} from 'enzyme';

import LoginHelp from './login-help';

describe('<LoginHelp />', () => {
    it('Renders without crashing', () => {
        shallow(<LoginHelp />);
    });
});