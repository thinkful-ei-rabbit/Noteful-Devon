import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddNote from './AddNote'



it('renders a form.NotefulForm by default', () => {
  const wrapper = shallow(<AddNote />)
  expect(toJson(wrapper)).toMatchSnapshot()
})
