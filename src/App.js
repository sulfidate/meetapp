import React, { Component } from 'react'
import './App.css'
import './nprogress.css'
import EventList from './EventList'
import CitySearch from './CitySearch'
import NumberOfEvents from './NumberOfEvents'
import WelcomeScreen from './WelcomeScreen'
import { getEvents, extractLocations, checkToken, getAccessToken } from './api'
import { OfflineAlert } from './Alert'

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    location: 'all',
    showWelcomeScreen: undefined,
  }

  async componentDidMount() {
    this.mounted = true

    const accessToken = localStorage.getItem('access_token')
    const isTokenValid = (await checkToken(accessToken)).error ? false : true
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get('code')
    this.setState({ showWelcomeScreen: !(code || isTokenValid) })

    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events),
        })
      })
    }
  }

  // if (!navigator.onLine) {
  //   this.setState({
  //     OfflineAlertText:
  //       'There is no internet connection - event-list is loading from cache!',
  //   })
  // } else {
  //   this.setState({
  //     OfflineAlertText: '',
  //   })
  // }

  componentWillUnmount() {
    this.mounted = false
    this.setState = (state, callback) => {
      return
    }
  }

  updateEvents = (location = 'all', number = this.state.numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events.slice(0, number)
          : events
              .filter((event) => event.location === location)
              .slice(0, number)
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, number),
          location,
        })
      }
      if (!navigator.onLine) {
        this.setState({
          infoText:
            'There is no internet connection - EventList is loading from cache!',
        })
      } else {
        this.setState({
          infoText: '',
        })
      }
    })
  }

  updateNumberOfEvents = (numberOfEvents) => {
    this.setState(
      {
        numberOfEvents,
      },
      this.updateEvents(this.state.location, numberOfEvents)
    )
  }

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className='App' />

    const { events, locations, numberOfEvents, OfflineAlertText } = this.state

    return (
      <div className='App'>
        <OfflineAlert text={this.state.infoText} />
        <CitySearch
          locations={locations}
          numberOfEvents={numberOfEvents}
          updateEvents={this.updateEvents}
        />

        <NumberOfEvents
          updateNumberOfEvents={(number) => {
            this.updateNumberOfEvents(number)
          }}
          updateEvents={this.updateEvents}
        />

        <EventList
          events={events}
          numberOfEvents={numberOfEvents}
          updateEvents={this.updateEvents}
        />
        <OfflineAlert text={OfflineAlertText} />

        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken()
          }}
        />
      </div>
    )
  }
}

export default App
