import React from 'react';
import {shallow, mount} from 'enzyme';

import HomeHelp from './home-help';

describe('<HomeHelp />', () => {
    it('Renders without crashing', () => {
        shallow(<HomeHelp />);
    });
});