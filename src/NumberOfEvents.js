import React, { Component } from 'react'

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  }

  handleInputChange = (e) => {
    const value = e.target.value
    if (value < 1 || value > 32) {
      this.setState({
        numberOfEvents: 0,
      })
    } else {
      this.setState({
        numberOfEvents: value,
      })
    }
    this.props.updateNumberOfEvents(e.target.value)
  }

  render() {
    return (
      <div className='number-of-events'>
        <label className='number-of-events__label'>Number of events:</label>
        <input
          type='number'
          className='number-of-events__input'
          value={this.state.numberOfEvents}
          onChange={(e) => this.handleInputChange(e)}
        />
      </div>
    )
  }
}

export default NumberOfEvents
