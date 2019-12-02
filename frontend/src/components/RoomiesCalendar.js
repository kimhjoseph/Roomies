import React from "react";
import NavbarComponent from "./NavbarComponent";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import CalendarCreateEventModal from "./CalendarCreateEventModal";
import "react-datepicker/dist/react-datepicker.css";
import "./RoomiesCalendar.css";
axios.defaults.withCredentials = true;
const localizer = momentLocalizer(moment)

class RoomiesCalendar extends React.Component {
  constructor () {
    super()
    this.state = {
      events: [],
      loading: true,
      tempEvent: {
        title: "",
        start: (new Date()).toJSON(),
        end: (new Date()).toJSON(),
        allDay: true,
        users: [],
        eventId: undefined
      },
      users: [],
      addEventModal: false,
    };
    this.getEvents = this.getEvents.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.toggleAllDay = this.toggleAllDay.bind(this);
    this.updateStart = this.updateStart.bind(this);
    this.updateEnd = this.updateEnd.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.showAddEventModal = this.showAddEventModal.bind(this);
  }
  componentDidMount () {
    // Fetch events from backend
    this.getEvents();
    this.getUsers();
  }
  
  toggleAllDay(e) {
    e.preventDefault();
    this.setState({
      tempEvent: {
        title: this.state.tempEvent.title,
        start: this.state.tempEvent.start,
        end: this.state.tempEvent.end,
        allDay: !this.state.tempEvent.allDay,
        users: this.state.tempEvent.users,
        eventId: this.state.tempEvent.eventId,
      }
    });
  }
  updateTitle(e) {
    this.setState({
      tempEvent: {
        title: e.target.value,
        start: this.state.tempEvent.start,
        end: this.state.tempEvent.end,
        allDay: this.state.tempEvent.allDay,
        users: this.state.tempEvent.users,
        eventId: this.state.tempEvent.eventId,
      }
    });
  }
  updateStart(date) {
    const {tempEvent} = this.state;
    let jsonStart = date.toJSON();
    this.setState({
      tempEvent: {
        title: tempEvent.title,
        start: jsonStart,
        end: moment(date).isAfter(moment(tempEvent.end).toDate()) ? jsonStart : tempEvent.end,
        allDay: tempEvent.allDay,
        users: tempEvent.users,
        eventId: tempEvent.eventId,
      }
    });
  }
  updateEnd(date) {
    this.setState({
      tempEvent: {
        title: this.state.tempEvent.title,
        start: this.state.tempEvent.start,
        end: date.toJSON(),
        allDay: this.state.tempEvent.allDay,
        users: this.state.tempEvent.users,
        eventId: this.state.tempEvent.eventId,
      }
    });
  }
  updateUsers(e) {
    console.log("Updating new item people...");
    const user = e.target.value;
    var found = this.state.tempItem.users.find(i => i === user);
    var users;
    if (found === undefined) {
      users = this.state.tempItem.users.concat([user]);
    } else {
      users = this.state.tempItem.users.filter(i => i !== user);
    }
    this.setState({
      tempItem: {
        title: this.state.tempEvent.title,
        start: this.state.tempEvent.start,
        end: this.state.tempEvent.end,
        allDay: this.state.tempEvent.allDay,
        users: users,
        eventId: this.state.tempEvent.eventId,
      }
    });
    console.log("Successfully updated new item people!");
  }
  showAddEventModal() {
    this.setState({ 
      addEventModal: !this.state.addEventModal,
      allDay: true,
    });
  }

  getEvents() {
    axios.get("http://localhost:4000/event/get")
      .then(resp => {
        this.setState({ events: resp.data, loading: false });
        console.log(resp.data);
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }
  getUsers() {
    axios.get("http://localhost:4000/user/get")
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }
  handleAddEvent = async tempEvent => {
    let parsedEvent = {
      title: this.state.tempEvent.title,
      start: this.state.tempEvent.start,
      end: this.state.tempEvent.end,
      allDay: this.state.tempEvent.allDay,
      users: this.state.tempEvent.users,
    }
    await axios.post("http://localhost:4000/event/add", parsedEvent)
    .then(response => {
      var concatEvent = {
        title: tempEvent.title,
        start: moment(tempEvent.start).toDate(),
        end: moment(tempEvent.end).toDate(),
        allDay: tempEvent.event,
        users: tempEvent.users,
        eventId: response.data
      };
      this.setState(currentState => {
        return {
          events: currentState.events.concat([concatEvent]),
          tempEvent: {
            title: "",
            start: (new Date()).toJSON(),
            end: (new Date()).toJSON(),
            allDay: true,
            users: [],
            eventId: undefined
          }
        };
      });
      console.log("Successfully added event!");
    })
    .catch(error => {
      console.log("Error: " + error);
    });
  };

  handleClick() {
    let tempEvent = {
      title: 'DAD Showcase',
      allDay: true,
      start: '2019-12-02T02:00:00-07:00',
      end: '2019-12-02T02:00:00-07:00',
      users: ['zcachary prong']
    };
    this.addEvent(tempEvent);
  }

  render () {
    const {events} = this.state;
    // const events = [{
    //   'allDay': true,
    //   'start': moment('2019-11-28T09:00:00-07:00').toDate(),
    //   'end': moment('2019-11-28T17:00:00-07:00').toDate(),
    //   'title': 'Google I/O 2015',
    // }];

    const calendarEvents = events.map(event => {
      return {
        'title': event.title,
        'allDay': event.allDay,
        'start': moment(event.start).toDate(),
        'end': moment(event.end).toDate(),
      };
    });
    return (
      <div style={{height:'100vh'}}>
        <NavbarComponent />
        <div style={{padding: '20px 40px'}}>
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            style={{height: 640, marginBottom: '50px'}}
          />
          <button onClick={this.showAddEventModal} className="calendar-button">Create Event</button>
          <CalendarCreateEventModal
            onClose={this.showAddEventModal}
            show={this.state.addEventModal}
            handleAddEvent={this.handleAddEvent}
            tempEvent={this.state.tempEvent}
            toggleAllDay={this.toggleAllDay}
            updateTitle={this.updateTitle}
            updateStart={this.updateStart}
            updateEnd={this.updateEnd}
            updateTime={this.updateTime}
            updatePeople={this.updatePeople}
            users={this.state.users}
          />
        </div>
      </div>
    )
  }
}

export default RoomiesCalendar;