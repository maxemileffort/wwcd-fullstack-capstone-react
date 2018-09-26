import React from 'react';
import {shallow, mount} from 'enzyme';

import Errors from './errors';

describe('<Errors />', () => {
    it('Renders without crashing', () => {
        shallow(<Errors />);
    });
});