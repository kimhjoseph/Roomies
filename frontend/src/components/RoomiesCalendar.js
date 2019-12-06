import React from "react";
import NavbarComponent from "./NavbarComponent";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import CalendarCreateEventModal from "./CalendarCreateEventModal";
import EventCardModal from "./EventCardModal";
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
      eventCardModal: false,
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
    this.deleteEvent = this.deleteEvent.bind(this);
    this.showAddEventModal = this.showAddEventModal.bind(this);
    this.showEventCardModal = this.showEventCardModal.bind(this);
    this.getEvent = this.getEvent.bind(this);
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
    console.log("Updating new event people...");
    const user = e.target.value;
    var found = this.state.tempEvent.users.find(i => i === user);
    var users;
    if (found === undefined) {
      users = this.state.tempEvent.users.concat([user]);
    } else {
      users = this.state.tempEvent.users.filter(i => i !== user);
    }
    this.setState({
      tempEvent: {
        title: this.state.tempEvent.title,
        start: this.state.tempEvent.start,
        end: this.state.tempEvent.end,
        allDay: this.state.tempEvent.allDay,
        users: users,
        eventId: this.state.tempEvent.eventId,
      }
    });
    console.log("Successfully updated new event people!");
  }
  showAddEventModal() {
    this.setState({ 
      addEventModal: !this.state.addEventModal,
      allDay: true,
    });
  }
  showEventCardModal(e) {
    console.log(e);
    // this.getEvent(e.resource);
    let isDisplayed = this.state.eventCardModal
    this.setState({ 
      eventCardModal: !this.state.eventCardModal,
      tempEvent: isDisplayed ? 
        {
          title: "",
          start: (new Date()).toJSON(),
          end: (new Date()).toJSON(),
          allDay: true,
          users: [],
          eventId: undefined
        } :
        {
          title: e.title,
          start: e.start,
          end: e.end,
          allDay: e.allDay,
          users: e.users,
          eventId: e.key,
        }
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
  getEvent(eventId) {
    axios.get("http://localhost:4000/event/get_one", eventId)
      .then(resp => {
        this.setState({tempEvent: resp.data});
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
  deleteEvent(eventId) {
    axios.delete("http://localhost:4000/event/delete_event/" + eventId)
      .then(() => {
        this.setState({
          tempEvent: {
            title: "",
            start: (new Date()).toJSON(),
            end: (new Date()).toJSON(),
            allDay: true,
            users: [],
            eventId: undefined
          },
          events: this.state.events.filter(event => event.eventId !== eventId)
        });
      });
  }

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
        'key': event.eventId,
        'users': event.users,
      };
    });
    return (
      <div style={{height:'100vh'}}>
        <NavbarComponent />
        <div style={{padding: '20px 30px'}}>
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            style={{height: 640, marginBottom: '50px'}}
            onSelectEvent={this.showEventCardModal}
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
            updateUsers={this.updateUsers}
            deleteEvent={this.deleteEvent}
            users={this.state.users}
          />
          <EventCardModal
            onClose={this.showEventCardModal}
            tempEvent={this.state.tempEvent}
            show={this.state.eventCardModal}
            deleteEvent={this.deleteEvent}
          />
        </div>
      </div>
    )
  }
}

export default RoomiesCalendar;