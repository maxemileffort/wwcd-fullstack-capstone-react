import React from 'react';
import {shallow, mount} from 'enzyme';

import Admin from './admin';

describe('<Admin />', () => {
    let props = {
        appState: 
            {
            loggedIn: false,
            user: {
                username: 'abc',
                accountType: 'Admin'
            },
            error: null,
            confirmation: null
        }
    }
    it('Renders without crashing', () => {
        shallow(<Admin {...props}/>);
    });
});