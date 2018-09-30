import React from 'react';
import {shallow, mount} from 'enzyme';

import DashboardHelp from './dashboard-help';

describe('<DashboardHelp />', () => {
    it('Renders without crashing', () => {
        shallow(<DashboardHelp />);
    });
});