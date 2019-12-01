import React from "react";
import NavbarComponent from "./NavbarComponent";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const CALENDAR_ID = 'zprong@g.ucla.edu'
const GOOGLE_API_KEY = 'AIzaSyBz0SoAI26Bq_scJlGfUbOdSj53gaDASOc'
const CLIENT_ID = '634944295130-etf1ek4s58mdbl378f0mh2dk99eb8bq3.apps.googleusercontent.com'
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_API_KEY}`
const localizer = momentLocalizer(moment)

export function getEvents (callback) {

  // request
  //   .get(url)
  //   .end((err, resp) => {
  //     if (!err) {
  //       const events = []
  //       JSON.parse(resp.text).items.map((event) => {
  //         events.push({
  //           start: event.start.date || event.start.dateTime,
  //           end: event.end.date || event.end.dateTime,
  //           title: event.summary,
  //         })
  //       })
  //       callback(events)
  //     }
  //   })


//   window.gapi
//   .load('client:auth2', () => {
//     window.gapi
//     .client
//     .init({
//       apiKey: GOOGLE_API_KEY,
//       clientId: CLIENT_ID,
//       discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
//       scope: SCOPES
//     })
//   gapi.client.init({
//     'apiKey': GOOGLE_API_KEY,
//     // Your API key will be automatically added to the Discovery Document URLs.
//     'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
//     // clientId and scope are optional if auth is not required.
//     'clientId': CLIENT_ID,
//     'scope': SCOPES,
//   }).then(function() {
//     // 3. Initialize and make the API request.
//     return gapi.client.people.people.get({
//       'resourceName': 'people/me',
//       'requestMask.includeField': 'person.names'
//     });
//   }).then(function(response) {
//     console.log(response.result);
//   }, function(reason) {
//     console.log('Error: ' + reason.result.error.message);
//   });
//   };
// // 1. Load the JavaScript client library.
// gapi.load('client', start);
//   });
  return;
}

class RoomiesCalendar extends React.Component {
  constructor () {
    super()
    this.state = {
      events: [],
      isSignedIn: false,
      gapi: false,
      onLoadCallback: null,
      calendar: 'primary',
    }
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.initClient = this.initClient.bind(this);
    this.handleSignoutClick = this.handleSignoutClick.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    // this.createEvent = this.createEvent.bind(this);
    this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
    // this.createEventFromNow = this.createEventFromNow.bind(this);
    this.listenSign = this.listenSign.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.setCalendar = this.setCalendar.bind(this);
  }
  componentDidMount () {
    // getEvents((events) => {
    //     this.setState({events})
    // })
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    const script2 = document.createElement("script");
    script2.src = "https://apis.google.com/js/platform.js";
    document.body.appendChild(script);
    document.body.appendChild(script2);
    this.setState({ gapi: window['gapi'] });
    // this.setState({events: events});
    script2.onload = () => {
        window['gapi'].load('client:auth2', this.initClient);
    };
    // let events = this.listUpcomingEvents(25);
  }

  updateSigninStatus(isSignedIn) {
    this.setState({sign: isSignedIn});
  }
  setCalendar(newCalendar) {
    this.setState({calendar: newCalendar});
  }
  listenSign(callback) {
    if (this.state.gapi) {
        this.state.gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
    }
    else {
        console.log("Error: this.gapi not loaded");
    }
  }

  onLoad(callback) {
    if (this.state.gapi) {
        callback();
    }
    else {
        // this.state.onLoadCallback = callback;
        this.setState({onLoadCallback: callback});
    }
  }

  handleSignoutClick() {
    if (this.state.gapi) {
        this.state.gapi.auth2.getAuthInstance().signOut();
    }
    else {
        console.log("Error: this.gapi not loaded");
    }
  }
  listUpcomingEvents(maxResults, calendarId = this.state.calendar) {
    if (this.state.gapi) {
        return this.state.gapi.client.calendar.events.list({
            'calendarId': calendarId,
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': maxResults,
            'orderBy': 'startTime'
        });
    }
    else {
        console.log("Error: this.gapi not loaded");
        return false;
    }
}

  initClient() {
    this.setState({ gapi: window['gapi'] });
    this.state.gapi.client.init({
            apiKey: GOOGLE_API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
            scope: SCOPES
    }).then(() => {
      // Listen for sign-in state changes.
      let events = this.listUpcomingEvents(25);
      this.setState({events: events});
      this.state.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
      // Handle the initial sign-in state.
      this.updateSigninStatus(this.state.gapi.auth2.getAuthInstance().isSignedIn.get());
      if (this.onLoadCallback) {
          this.onLoadCallback();
      }
    })
        .catch((e) => {
        console.log(e);
    });
  }
  handleAuthClick() {
    if (this.state.gapi) {
        this.state.gapi.auth2.getAuthInstance().signIn();
    }
    else {
        console.log("Error: this.gapi not loaded");
    }
  }


  render () {
    // const {events} = this.state;
    const events = [{
      'start': '2019-11-28T09:00:00-07:00',
      'end': '2019-11-28T17:00:00-07:00',
      'title': 'Google I/O 2015',
    }];

    return (
    <div style={{height:'100vh'}}>
      <NavbarComponent />
      
      <Calendar
        localizer={localizer}
        events={events}
        style={{height: 500}}
      />
    </div>
  )}
}

export default RoomiesCalendar;