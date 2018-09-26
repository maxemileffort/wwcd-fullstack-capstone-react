import React from 'react';
import {shallow, mount} from 'enzyme';

import Content from './content';

describe('<Content />', () => {
    it('Renders without crashing', () => {
        shallow(<Content />);
    });
});