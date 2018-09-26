import React from 'react';
import {shallow, mount} from 'enzyme';

import Rundown from './rundown';

describe('<Rundown />', () => {
    it('Renders without crashing', () => {
        shallow(<Rundown />);
    });
});