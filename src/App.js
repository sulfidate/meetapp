import React, { Component } from 'react'
import './App.css'
import './nprogress.css'
import EventList from './EventList'
import CitySearch from './CitySearch'
import NumberOfEvents from './NumberOfEvents'
import EventGenre from './EventGenre'
import WelcomeScreen from './WelcomeScreen'
import { getEvents, extractLocations, checkToken, getAccessToken } from './api'
import { OfflineAlert } from './Alert'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    location: 'all',
    showWelcomeScreen: undefined,
    offlineText: '',
  }

  updateNumberOfEvents = (numberOfEvents) => {
    this.setState(
      {
        numberOfEvents,
      },
      this.updateEvents(this.state.location, numberOfEvents)
    )
  }

  updateEvents = (location, number = this.state.numberOfEvents) => {
    getEvents().then((events) => {
      if (number !== undefined) {
        this.setState({
          numberOfEvents: this.state.numberOfEvents,
        })
      }
      // filter event list by location
      let eventList =
        location !== 'all'
          ? events.filter((event) => event.location === location)
          : events

      // Shorten event list
      let shortEventList = eventList.slice(0, this.state.numberOfEvents)

      // Assign value to events state, assign currentLocation
      this.setState({
        events: shortEventList,
        currentLocation: location,
      })
    })
  }

  async componentDidMount() {
    this.mounted = true

    if (
      navigator.onLine &&
      !window.location.href.startsWith('http://localhost')
    ) {
      const accessToken = localStorage.getItem('access_token')
      const isTokenValid = (await checkToken(accessToken)).error ? false : true
      const searchParams = new URLSearchParams(window.location.search)
      const code = searchParams.get('code')
      this.setState({ showWelcomeScreen: !(code || isTokenValid) })
      if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({
              events,
              locations: extractLocations(events),
              offlineText: '',
            })
          }
        })
      }
    } else {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events),
            offlineText:
              'You are offline. The displayed event list may not be up to date.',
            showWelcomeScreen: false,
          })
        }
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  getData = () => {
    const { locations, events } = this.state
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length
      const city = location.split(', ').shift()
      return { city, number }
    })
    return data
  }

  render() {
    const { events, locations, offlineText, showWelcomeScreen } = this.state

    if (showWelcomeScreen === undefined) return <div className='App' />

    return (
      <>
        <OfflineAlert text={offlineText} />
        <br />

        <div className='App'>
          <div className='topBar'>
            <h4 className='appTitle'>Meet App</h4>
            <CitySearch
              locations={locations}
              updateEvents={this.updateEvents}
            />
            <NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents} />
          </div>

          <div className='data-vis-wrapper'>
            <h4>Event Share over all</h4>
            <EventGenre events={events} />

            <ResponsiveContainer height={400}>
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis type='category' dataKey='city' name='city' />
                <YAxis
                  type='number'
                  dataKey='number'
                  name='number of events'
                  allowDecimals={false}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={this.getData()} fill='#8884d8' />
              </ScatterChart>
            </ResponsiveContainer>
            <h4>Events in each city</h4>
          </div>

          <EventList events={events} />
          <OfflineAlert text={this.state.OfflineAlertText} />

          <WelcomeScreen
            showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => {
              getAccessToken()
            }}
          />
        </div>
      </>
    )
  }
}

export default App
