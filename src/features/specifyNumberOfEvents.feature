Feature: specify number of events

    Scenario: number of events input is displayed 
        Given app opens on main page
        When number of events is not specified
        Then number of events input default is displayed

    Scenario: When the user enters a number in the text field, the number of events displayed should match the number entered
        Given the main page is open
        When the user types a number into the number of events input box
        Then the number of events displayed should match the number input by the user unless there are fewer events than the specified number
            And the number of events will be specified
