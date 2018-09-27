import React from 'react';
import {shallow, mount} from 'enzyme';

import Login from './login';

describe('<Login />', () => {
    let props = {
        appState: 
            {
            loggedIn: false,
            user: null,
            error: null,
            confirmation: null
        }
    }
    it('Renders without crashing', () => {
        shallow(<Login {...props}/>);
    });
});