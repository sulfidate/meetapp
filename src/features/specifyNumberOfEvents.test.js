import { mount } from 'enzyme'
import { loadFeature, defineFeature } from 'jest-cucumber'
import App from '../App'
import NumberOfEvents from '../NumberOfEvents'

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature')

defineFeature(feature, (test) => {
  let AppWrapper
  let NumberOfEventsWrapper
  test('number of events input is displayed', ({ given, when, then }) => {
    given('app opens on main page', () => {
      AppWrapper = mount(<App />)
    })

    when('number of events is not specified', () => {
      AppWrapper.update()
    })

    then('number of events input default is displayed', () => {
      expect(AppWrapper.find('.number-of-events')).toHaveLength(1)
    })
  })

  test('When the user enters a number in the text field, the number of events displayed should match the number entered', ({
    given,
    when,
    then,
    and,
  }) => {
    given('the main page is open', async () => {
      AppWrapper = await mount(<App />)
    })

    when('the user types a number into the number of events input box', () => {
      NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents)
      NumberOfEventsWrapper.find('.number-of-events__input').simulate(
        'change',
        {
          target: { value: 1 },
        }
      )
    })

    then(
      'the number of events displayed should match the number input by the user unless there are fewer events than the specified number',
      () => {
        expect(AppWrapper.find('.number-of-events__input')).toHaveLength(1)
      }
    )

    and('the number of events will be specified', () => {
      NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents)
      NumberOfEventsWrapper.find('.number-of-events__input').simulate(
        'change',
        { target: { value: 1 } }
      )
      expect(AppWrapper.state('numberOfEvents')).toEqual(1)
    })
  })
})
