import React from 'react';
import {shallow, mount} from 'enzyme';

import Contact from './contact';

describe('<Contact />', () => {
    it('Renders without crashing', () => {
        shallow(<Contact />);
    });
});