import React from 'react';
import {shallow, mount} from 'enzyme';

import AboutHelp from './about-help';

describe('<AboutHelp />', () => {
    it('Renders without crashing', () => {
        shallow(<AboutHelp />);
    });
});