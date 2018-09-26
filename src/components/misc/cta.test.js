import React from 'react';
import {shallow, mount} from 'enzyme';

import Cta from './cta';

describe('<Cta />', () => {
    it('Renders without crashing', () => {
        shallow(<Cta />);
    });
});