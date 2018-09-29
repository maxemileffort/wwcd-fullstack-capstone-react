import React from 'react';
import {shallow, mount} from 'enzyme';

import Sidebar from './sidebar';

describe('<Sidebar />', () => {
    it('Renders without crashing', () => {
        shallow(<Sidebar />);
    });
});