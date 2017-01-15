import React from 'react'
import Countdown from '../../src/js/components/Countdown'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(
    <Countdown />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
