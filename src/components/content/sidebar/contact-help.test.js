import React from 'react';
import {shallow, mount} from 'enzyme';

import ContactHelp from './contact-help';

describe('<ContactHelp />', () => {
    it('Renders without crashing', () => {
        shallow(<ContactHelp />);
    });
});