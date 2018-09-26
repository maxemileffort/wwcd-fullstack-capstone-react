import React from 'react';
import {shallow, mount} from 'enzyme';

import Hero from './hero';

describe('<Hero />', () => {
    it('Renders without crashing', () => {
        shallow(<Hero />);
    });
});