# meet app
## Objective
To build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. 
The application uses the Google Calendar API to fetch upcoming events for a selected city.
## Description

live demo: https://sulfidate.github.io/meetapp/

### mobile View

<img width="200" alt="Welcome to the Meet app" src="https://user-images.githubusercontent.com/78739948/173131675-784c3323-18a8-40ca-b685-5d6addd7f716.jpeg">
<img width="200" alt="Meet App" src="https://user-images.githubusercontent.com/78739948/173131703-3609d9c8-216b-41fa-b1f3-5c16e61b2bee.jpeg">
<img width="200" alt="Welcome to the Meet app" src="https://user-images.githubusercontent.com/78739948/173131694-b4fc3e77-12ff-438d-8b99-9419e4fd8c82.jpeg">


### desktop view

<img width="500" alt="Welcome to the Meet app" src="https://user-images.githubusercontent.com/78739948/173130797-2be894bb-71e1-4168-859e-a8f550372170.png">

<img width="500" alt="Pasted Graphic 2" src="https://user-images.githubusercontent.com/78739948/173130835-8440e2c0-4f30-4a2e-8d1a-7ff86166dbfe.png">

## Context
Serverless and PWAs have grown in popularity over the last few years, and they’re both considered to be the future of web development. By combining these two concepts, your app will not only work as a normal web application, but it will also reap the benefits of both serverless architecture and PWAs:
- Serverless:​ No backend maintenance, easy to scale, always available, no cost for idle time.
- PWAs:​ Instant loading, offline support, push notifications, “add to home screen” prompt, responsive design, and cross-platform compatibility.

For this app, you’ll be using a TDD approach, where you write tests before writing the actual functionality for your app in code. Writing tests forces you to focus on the requirements of your application before jumping into the code. TDD relies on the repetition of a very short development cycle, allowing you to get immediate feedback and deliver high-quality code.
Last but not least, you’ll add some graphs to your app, which will make it more visually appealing and allow you to more easily draw conclusions from the data. A picture is worth a thousand words, right? With a number of visualization techniques under your belt, you’ll be able to display any type of data you want and produce a variety of output formats. Your app will allow users to search for a city and get a list of meetup events hosted in that city. For the data visualization component, you’ll add a chart that shows how many events (meetups) will take place in that city on upcoming days.

## What technology did I use and why?
For the frontend of the meetapp application I chose React. The main reasons are the
- type of application: I need a library helping me build the UI of my app. React is suited best for the view side of the mvc approach and its virtual DOM ensures faster rendering of views

- scope: The component-based nature of React allows me to increase the scope of my web application with little to no performance issues or concerns about entropy.

- good documentation: for a beginner like me, it is important that the tools I use are well documented, so that I can understand the different components I work with. Another factor in my decision was, that it is kept up to date. In case of a library developed and maintained by Facebook, that is not a problem.

- popularity: React is in high demand at the moment. This can be seen in job ad, the stars on GitHub (187k) as well as the contributions to stack overflow. This support in the developer community ensures that Il will eventually find solutions when troubleshooting.

- mobile version: with its associated ecosystem of tools, React is also a good springboard for my next project, where I want to use React Native for a mobile application. So getting familiar with React first is valuable.

I created the application using the Create React App boilerplate, enabling the pwa template to transfer the app into a PWA in the development process:

`npx create-react-app meetapp --template cra-template-pwa --use-npm`
## Key features
- Filter events by city.
- Show/hide event details.
- Specify number of events.
- Use the app when offline.
- Add an app shortcut to the home screen.
- View a chart showing the number of upcoming events by city.
## User stories and tesing scenarios
  - As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.
1. Scenario: An event element is collapsed by default Given the main page is open When a user search for a city and the events are loaded Then the event element details will be hidden
2. Scenario: User can expand an event to see its details Given the list of events has been loaded When user clicks on “Show details” button for an event Then the event element will be expanded to show the event details
3. Scenario: User can collapse an event to hide its details Given the “Show details” button for an event has been clicked and the details are expanded When user clicks on “Hide details” button on that event Then the event element will collapse again, hiding the details
  - As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.
1. Scenario: When user hasn’t specified a number, 32 is the default number Given a user has chosen the city they want to see events for When the user doesn’t specify a number of events they want to view Then the default number will be set to 32
2. Scenario: User can change the number of events they want to see Given a user has chosen the city they want to see events for When they type a number into the box “Number of Events” Then the according number of events will load for the respective city
  - As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.
1. Scenario: Show cached data when there’s no internet connection Given a user has used the app before When they access the website offline Then the events they viewed previously will be shown
2. Scenario: Show error when user changes the settings (city, time range) Given a user accesses the website offline When they change the setting such as city or time range Then an error will be shown
  - As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.
1. Scenario: Show a chart with the number of upcoming events in each city Given a user has chosen a city When the list of events is shown Then on top of the list a chart that visualizes the type of upcoming events will be shown

## How to install and run the project ...
... as a developer, who wants to work with the project
* Clone or download repository ...
`git clone https://github.com/sulfidate/meetapp.git`
* Connect to your github pages Follow the instructions provided by github: https://pages.github.com

Edit homepage address in package.json to fit to your github account

To run app on localhost:

npm run start
To push changes to github pages
npm run deploy
... to access the already hostet the live app:
https://sulfidate.github.io/meetapp/

## Technical Requirements
React application
Built using TDD technique
Use the Google Calendar API and OAuth2 authentication flow.
Use use serverless functions (AWS lambda is preferred) for the authorization server instead of using a traditional server
Work offline or in slow network conditions with the help of a service worker.
Use React axios and async/await.
Implement an alert system using an OOP approach to show information to the user.
Make use of data visualization using the recharts library.
Be monitored using an online monitoring tool.
## Development Process for the meet-app

- Create test scenarios for each user story
- Create serverless functions to adhere to Google OAuth2 authentication flow
  - Create a Oauth Consumer
    - Create new project in Google's API console
    - Enable Google Calendar API
    - Create credentials
    - Add scopes
    - Add origin and URI to app's domain
    - Add test users
    - Download credentials

  - Verify app's domain
    - Download the HTML verification file from Google developer console and add to /public folder in app

  - Create a serverless service
    - Install serverless toolkit:
      - npm install -g serverless
    - Set up server directory:
      - Create a new serverless service/project using aws-nodejs
        - serverless create --template aws-nodejs --path auth-server
      - Jump into the newly created directory
        - cd auth-server
      - Then create a package.json
        - npm init
  - Add config.json to .gitignore file
- Configure AWS credentials
  - Go to AWS console
  - Navigate to 'My security credentials'
  - Create new access key & download file
  - Configure credentials for serverless:
    - serverless config credentials --provider aws --key ACCESS_KEY_ID --secret SECRET_ACCESS_KEY
- Add secrets to config.json file
  - Within server directory, create config.json file
  - Add credentials stored in client_secret_.json file to config.file
  - Add Calendar ID of calendar that will be used in application to config.file
- Set up serverless file
  - Install Google APIs package
    - npm install googleapis@^59.0.0 --save
  - Set up handler.js file with serverless functions
  - Deploy serverless
    - serverless deploy
  - Obtain serverless API endpoints
    - serverless info
### Unit testing
### Integration testing
### User Acceptance & End-to-end tesing
### Transform applications into PWA
    - In src/index.js file, register service worker by changing from serviceWorkerRegistration.unregister() to serviceWorkerRegistration.register()
    - Add app infos to manifest.json
### Add data visualization using Recharts
