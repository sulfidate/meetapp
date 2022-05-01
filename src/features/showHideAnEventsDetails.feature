Feature: show/hide events details

    Scenario: An event element is collapsed by default.
        Given the main page is open
        When an event is displayed
        Then the event details will be collapsed.

    Scenario: User can expand an event to see its details
        Given list of events is displayed
        When the user clicks on a details button
        Then the event details will be displayed

    Scenario: User can collapse an event to hide its details
        Given The event details are displayed
        When the user clicks on the details button
        Then the event details will hide