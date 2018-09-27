import React from 'react';
import {shallow, mount} from 'enzyme';

import Dashboard from './dashboard';

describe('<Dashboard />', () => {
    let props = {
        appState: 
            {
            loggedIn: true,
            user: {username: 'abc'},
            error: null,
            confirmation: null
        }
    }
    it('Renders without crashing', () => {
        shallow(<Dashboard {...props}/>);
    });
});