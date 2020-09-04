import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddFolder from './AddFolder'



it('renders a form.NotefulForm by default', () => {
  const wrapper = shallow(<AddFolder />)
  expect(toJson(wrapper)).toMatchSnapshot()
})