import React from 'react';
import {shallow, mount} from 'enzyme';

import Account from './Account';

describe('<Account />', () => {
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

    it('should render correctly', () => {
        shallow(<Account {...props}/>);
    });

    
});