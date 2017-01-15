import React from 'react'
import Countdown from '../../src/js/components/Countdown'
import renderer from 'react-test-renderer'

it('renders correctly with 0 width', () => {
  const tree = renderer.create(
    <Countdown />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it('changes the width when timeLeft / totalTime changes', () => {
  const component = renderer.create(
    <Countdown timeLeft={1000} totalTime={1000} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  const component2 = renderer.create(
    <Countdown timeLeft={500} totalTime={1000} />
  )
  tree = component2.toJSON()
  expect(tree).toMatchSnapshot()

  const component3 = renderer.create(
    <Countdown timeLeft={0} totalTime={1000} />
  )
  tree = component3.toJSON()
  expect(tree).toMatchSnapshot()
})
