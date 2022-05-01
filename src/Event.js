import React, { Component } from 'react';

class Event extends Component {


  state = {
    collapsed: true,
    eventDetailsButtonText: 'More details'
  };

  handleDetailsClick = () => {
    const current = this.state.collapsed;
    this.setState({
      collapsed: current ? false : true,
      eventDetailsButtonText: current ? "Hide details" : "More details"
    });
  }


  render() {
    const { event } = this.props;
    const { collapsed, eventDetailsButtonText } = this.state;

    return (
      <div
        className="event"
      >
        <h3
          className="summary">{event.summary}
        </h3>
        <p>
          <span
            className="start-time"
          >
            {event.start.dateTime} ({event.start.timeZone})
          </span>
        </p>
        <p
          className="event-details__location"
        >
          {event.location}
        </p>


        {!collapsed && (
          <div
            className="event-details">
            <p
              className="event-details__description">{event.description}
            </p>
            <p>
              <span
                className="event-details__start-time"
              >
                {event.start.dateTime}
              </span>-<span
                className="event-details__end-time"
              >
                {event.end.dateTime}
              </span>
            </p>
            <p>View event on Google Calendar <br />
              <a
                className="event-details__link"
                href={event.htmlLink}
              >
                {event.htmlLink}
              </a>
            </p>
          </div>
        )}

        <button
          className="details-btn"
          onClick={this.handleDetailsClick}
        >
          {eventDetailsButtonText}
        </button>
      </div>
    )
  }
}
export default Event;


