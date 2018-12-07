import React from 'react';
import { shallow } from 'enzyme';

import Header from '../index';

describe('<Header />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(<Header />);
    expect(renderedComponent.find('div')).toHaveLength(1);
    expect(renderedComponent.find('NavBar')).toHaveLength(1);
    expect(renderedComponent.find('HeaderLink')).toHaveLength(2);
  });
});
