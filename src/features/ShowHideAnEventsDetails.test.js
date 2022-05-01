import { mount, shallow } from 'enzyme'
import { loadFeature, defineFeature } from 'jest-cucumber'
import React from 'react'
import App from '../App'
import { mockData } from '../mock-data'

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature')

defineFeature(feature, (test) => {
  let AppWrapper

  test('An event element is collapsed by default.', ({ given, when, then }) => {
    given('the main page is open', () => {
      AppWrapper = mount(<App />)
    })

    when('an event is displayed', () => {})

    then('the event details will be collapsed.', () => {
      expect(AppWrapper.find('.event-details')).toHaveLength(0)
    })
  })

  test('User can expand an event to see its details', ({
    given,
    when,
    then,
  }) => {
    let EventListWrapper

    given('list of events is displayed', () => {
      AppWrapper.update()
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length)
    })

    when('the user clicks on a details button', () => {
      AppWrapper.find('.details-btn').at(1).simulate('click')
    })

    then('the Event Details will be displayed', () => {
      expect(AppWrapper.find('.event-details')).toHaveLength(1)
    })
  })

  test('User can collapse an event to hide its details', ({
    given,
    when,
    then,
  }) => {
    given('The event details are displayed', () => {
      AppWrapper.update()

      expect(AppWrapper.find('.event-details')).toHaveLength(1)
    })

    when('the user clicks on the details button', () => {
      AppWrapper.find('.details-btn').at(1).simulate('click')
    })

    then('the event details will hide', () => {
      expect(AppWrapper.find('.evnt-details')).toHaveLength(0)
    })
  })
})
