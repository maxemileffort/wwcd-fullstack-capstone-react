import React from 'react';
import {shallow, mount} from 'enzyme';

import Errors from './errors';

describe('<Errors />', () => {
    let props = {
        appState: {
                error: 'Test error',
                confirmation: 'Test confirmation',
            }
    }
    it('Renders without crashing', () => {
        shallow(<Errors {...props}/>);
    });
});