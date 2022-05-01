import React from 'react'
import { shallow } from 'enzyme'
import NumberOfEvents from '../NumberOfEvents'
import { toHaveValue } from '@testing-library/jest-dom/dist/matchers'

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents
        handleInputChange={() => {}}
        updateNumberOfEvents={() => {}}
      />
    )
  })

  test('render number of events element', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1)
  })

  test('render number of events input box', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events__input')).toHaveLength(
      1
    )
  })

  test('render number of events label', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events__label')).toHaveLength(
      1
    )
  })
  test('render number of events input', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events__input')).toHaveLength(
      1
    )
  })

  test('renders input number correctly', () => {
    const number = NumberOfEventsWrapper.state('numberOfEvents')
    expect(
      NumberOfEventsWrapper.find('.number-of-events__input').prop('value')
    ).toBe(number)
  })

  test('change state of numberOfEvents when text input changes', () => {
    NumberOfEventsWrapper.setState({
      numberOfEvents: { target: { value: 32 } },
      newNumber: 6,
    })
    const eventObject = { target: { value: 6 } }
    NumberOfEventsWrapper.find('.number-of-events__input').simulate(
      'change',
      eventObject
    )
    expect(NumberOfEventsWrapper.state('newNumber')).toBe(6)
  })

  test('ignore number input of text', () => {
    const eventObject = { target: { value: 'text' } }
    NumberOfEventsWrapper.find('.number-of-events__input').simulate(
      'change',
      eventObject
    )
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe('text')
  })
})
