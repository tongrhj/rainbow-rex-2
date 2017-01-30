import React from 'react'
import App from '../../src/js/pages/app'
import renderer from 'react-test-renderer'

beforeEach(() => {
  jest.enableAutomock()
  jest.mock('TelegramGameProxy')
})

it.skip('renders correctly', () => {
  const tree = renderer.create(
    <App />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

it.skip('changes with gameState', () => {
  const component = renderer.create(<App />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  console.log(JSON.stringify(tree, null, 4))
  tree = component.toJSON
  expect(tree).toMatchSnapshot()
})
