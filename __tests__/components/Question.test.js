import React from 'react'
import Question from '../../src/js/components/Question'
import renderer from 'react-test-renderer'

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.clearAllTimers()
})

it('renders correctly', () => {
  const tree = renderer.create(
    <Question />
  ).toJSON()
  expect(setTimeout.mock.calls.length).toBe(1)
  expect(tree).toMatchSnapshot()
})

it('changes on time passing', () => {
  const component = renderer.create(
    <Question />
  )
  let tree = component.toJSON()
  expect(setTimeout.mock.calls.length).toBe(1)
  expect(tree).toMatchSnapshot()

  jest.runOnlyPendingTimers()
  tree = component.toJSON()
  expect(setTimeout.mock.calls.length).toBe(2)
  expect(tree).toMatchSnapshot()
})

it('changes on addTime', () => {
  const component = renderer.create(
    <Question />
  )
  let tree = component.toJSON()
  expect(setTimeout.mock.calls.length).toBe(1)
  expect(tree).toMatchSnapshot()

  jest.runOnlyPendingTimers()
  tree = component.toJSON()
  expect(setTimeout.mock.calls.length).toBe(2)
  expect(tree).toMatchSnapshot()

  const component2 = renderer.create(
    <Question addTime={1000} />
  )
  jest.runOnlyPendingTimers()
  tree = component2.toJSON()
  expect(tree).toMatchSnapshot()
})

it('changes on round type', () => {
  const component = renderer.create(
    <Question readColourRound />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  const component2 = renderer.create(
    <Question readColourRound={false} />
  )
  tree = component2.toJSON()
  expect(tree).toMatchSnapshot()
})

it('changes on colour and word', () => {
  const component = renderer.create(
    <Question colour={'red'} word={'green'} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  const component2 = renderer.create(
    <Question colour={'green'} word={'red'} />
  )
  tree = component2.toJSON()
  expect(tree).toMatchSnapshot()
})

it('calls onTimeout after time left runs out', () => {
  const onTimeout = jest.fn()
  const component = renderer.create(
    <Question timeleft={1000} totalTime={1000} onTimeout={onTimeout} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  jest.runAllTimers()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(onTimeout).toBeCalled()
})
