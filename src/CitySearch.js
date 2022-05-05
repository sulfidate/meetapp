import React, { Component } from 'react'
import { InfoAlert } from './Alert'

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined,
  }

  handleInputChanged = (event) => {
    const value = event.target.value
    this.setState({ showSuggestions: true })
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1
    })
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText:
          'We can not find the city you are looking for. Please try another city',
      })
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: '',
      })
    }
  }

  handleSuggestionClicked = (suggestion, number) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
      infoText: '',
    })
    this.props.updateEvents(suggestion, number)
  }

  render() {
    const { numberOfEvents } = this.props

    return (
      <div className='CitySearch'>
        <InfoAlert text={this.state.infoText} />
        <label htmlFor={this.state.query}>Search for a city ...</label>
        <input
          type='text'
          className='city'
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => {
            this.setState({ showSuggestions: true })
          }}
        />
        <ul
          className='suggestions'
          style={this.state.showSuggestions ? {} : { display: 'none' }}
        >
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() =>
                this.handleSuggestionClicked(suggestion, numberOfEvents)
              }
            >
              {suggestion}
            </li>
          ))}
          <li
            key='all'
            onClick={() => this.handleSuggestionClicked('all', numberOfEvents)}
          >
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    )
  }
}

export default CitySearch
