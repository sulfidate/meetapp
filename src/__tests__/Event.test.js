import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';


describe('<Event /> component', () => {
  let EventWrapper;

  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[1]} />);
  });

  test('renders event', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  test('renders summary', () => {
    expect(EventWrapper.find('.summary')).toHaveLength(1);
  });

  test('renders correct summary', () => {
    expect(EventWrapper.find('.summary').text()).toBe('React is Fun');
  })

  test('renders start-time', () => {
    expect(EventWrapper.find('.start-time')).toHaveLength(1);
  });

  test('renders correct event details (location)', () => {
    expect(EventWrapper.find('.event-details__location').text()).toBe("Berlin, Germany");
  })

  test('renders show details button', () => {
    expect(EventWrapper.find('.details-btn')).toHaveLength(1);
  })


  test('Event state.collapsed is true on load', () => {
    expect(EventWrapper.state('collapsed')).toBe(true);
  })

  test('Event state.eventDetailsButtonText is "More details" on load', () => {
    expect(EventWrapper.state('eventDetailsButtonText')).toBe('More details');
  })

  test('Event state.collapsed toggles from true to false when button is clicked', () => {
    EventWrapper.setState({
      collapsed: true
    });
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  })

  test('When event state.collapsed = true, .event-details is hidden', () => {
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.find('.event-details')).toHaveLength(0);
  })

  test('Event state.eventDetailsButtonText changes to "Hide details" when event state.collapsed=false', () => {
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.state('eventDetailsButtonText')).toBe('Hide details');
  })

  test('Event state.eventDetailsButtonText toggled from "Hide details" to "More details" when button is clicked', () => {
    EventWrapper.setState({
      eventDetailsButtonText: "Hide details"
    });
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.state('eventDetailsButtonText')).toBe('More details');
  })

  test('renders event details', () => {
    EventWrapper.setState({
      collapsed: false
    });
    expect(EventWrapper.find('.event-details')).toHaveLength(1);
  })

  test('renders correct event details (description)', () => {
    EventWrapper.setState({
      collapsed: false
    });
    expect(EventWrapper.find('.event-details__description').text()).toBe("Love HTML, CSS, and JS? Want to become a cool front-end developer? \n\nReact is one of the most popular front-end frameworks. There is a huge number of job openings for React developers in most cities. \n\nJoin us in our free React training sessions and give your career a new direction. ");
  })

  test('renders correct event details (start-time)', () => {
    EventWrapper.setState({
      collapsed: false
    });
    expect(EventWrapper.find('.event-details__start-time').text()).toBe("2020-05-20T14:00:00+02:00");
  })

  test('renders correct event details (end-time)', () => {
    EventWrapper.setState({
      collapsed: false
    });
    expect(EventWrapper.find('.event-details__end-time').text()).toBe("2020-05-20T15:00:00+02:00");
  })

  test('renders correct event details (link)', () => {
    EventWrapper.setState({
      collapsed: false
    });
    expect(EventWrapper.find('.event-details__link').text()).toBe("https://www.google.com/calendar/event?eid=M3F0ZDZ1c2NxNHRzaTZnYzdubW10cHFsY3RfMjAyMDA1MjBUMTIwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20");
  })
});
