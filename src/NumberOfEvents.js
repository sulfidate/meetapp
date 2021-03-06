import React, { Component } from 'react'
import { ErrorAlert } from './Alert'

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errorText: '',
  }

  handleInputChange = (event) => {
    const number = event.target.value
    if (number < 1 || number > 32) {
      this.setState({
        numberOfEvents: '',
        errorText: 'Select a number from 1 to 32',
      })
    } else {
      this.setState({
        numberOfEvents: number,
        errorText: '',
      })
    }
    this.props.updateNumberOfEvents(event.target.value)
  }

  render() {
    return (
      <div className='number-of-events'>
        <ErrorAlert text={this.state.errorText} />
        <label className='number-of-events__label'>Number of events:</label>
        <input
          type='number'
          className='number-of-events__input'
          value={this.state.numberOfEvents}
          onChange={(event) => this.handleInputChange(event)}
        />
      </div>
    )
  }
}

export default NumberOfEvents
