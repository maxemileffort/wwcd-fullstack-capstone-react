import React from 'react';
import {shallow, mount} from 'enzyme';

import Account from './Account';

describe('<Account />', () => {
    let props = {appState: {
        user: {
            username: 'abc'
        }
    }};

    it('should render correctly', () => {
        shallow(<Account {...props}/>);
    });

    it('Renders the correct username', () => {
        let user = 'abc';
        const wrapper = shallow((
            <Account {...props}>
                <label htmlFor="account-username">Username:</label>
                <p>{props.appState.user.username}</p>
            </Account>
        ));
        expect(wrapper.contains(<p>{user}</p>)).to.equal(true);
      });
});