import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../helpers/MUITheme.js';
import {Link} from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import './Vacations.scss';
import BigCalendar from 'react-big-calendar';
import VacationDetails from '../VacationDetails/VacationDetails.jsx';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import events from '../../helpers/vacations.json';

const localizer = BigCalendar.momentLocalizer(moment);
const friendsEvents = [...new Set(
  [].concat(
    ...events.map(
      friend => 
      { 
        let arr = friend.vacations.map(
          vacation => {
            vacation.id = friend.id;
            vacation.friends = true;
            vacation.title = vacation.title + ' - ' + friend.name;
            vacation.start = moment(vacation.start, 'YYYY-MM-DD');
            if(!vacation.end){vacation.end = vacation.start;}
            else{vacation.end = moment(vacation.end, 'YYYY-MM-DD');}
            return vacation;
          }
        );
        return arr; 
      } 
    )
  )
)];
class Vacations extends Component {
  state = {
    showSelf: true,
    showFriends: true,
    selfVacations: []
  };

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.searchVacations();
    //get selfVacations from localStorage
  }

  searchVacations = () => {
    let vacations = [];
    let search = 'vacations';
    let values = Object.keys(localStorage).filter( (key)=> key.startsWith(search) );
    if(values){
      values.forEach(
        event => {
          let storedData = localStorage.getItem(event);
          vacations.push(JSON.parse(storedData));
        }
      );
      let arrCopy = this.state.selfVacations;
      arrCopy.push(...vacations);
      this.setState({selfVacations: arrCopy});
    }
  }

  setActiveEvent = event => {
    this.setState({activeEvent: event});
  }

  toggleFriends = () => {
    let bool = !this.state.showFriends;
    let currentVacations = this.state.currentVacations 
        || friendsEvents.concat(this.state.selfVacations);
    if(bool){
      currentVacations = currentVacations.filter(event => !event.friends).concat(friendsEvents);
    }else{
      currentVacations = currentVacations.filter(event => !event.friends);
    }
    this.setState({showFriends: bool, currentVacations: currentVacations});
  }

  toggleSelf = () => {
    let bool = !this.state.showSelf;
    let currentVacations = this.state.currentVacations 
        || friendsEvents.concat(this.state.selfVacations);
    if(bool){
      currentVacations = currentVacations.filter(event => event.friends).concat(this.state.selfVacations);
    }else{
      currentVacations = currentVacations.filter(event => event.friends);
    }
    this.setState({showSelf: bool, currentVacations: currentVacations});
  }

  setCurrentVacations = () => {
    this.setState({currentVacations: friendsEvents});
  }

  handleSelect = e => {
    let dateParam = moment(e.start, 'MM DD YYYY').format('YYYY-MM-DD');
    this.props.history.push('/new/'+dateParam);
  }

  handleDelete = () => {
    this.setState({ hideChip: true });
  }

  handleClick = () => {
    this.props.history.push('/new');
  }

  render() {
    return (
      <main className="home">
        <h1>Vacations</h1>
        { this.state.selfVacations.length === 0 && !this.state.hideChip && 
          <MuiThemeProvider theme={theme}>
            <Chip
              label="You haven't added any vacations yet. Add a new vacation."
              onClick={this.handleClick}
              onDelete={this.handleDelete}
            />
          </MuiThemeProvider>
        }

        {
          this.state.activeEvent 
          && <VacationDetails history={this.props.history} event={this.state.activeEvent} />
        }

        <div className="calendar-container">
          <BigCalendar
            localizer={localizer}
            events={this.state.currentVacations || friendsEvents.concat(this.state.selfVacations)}
            startAccessor="start"
            endAccessor="end"
            popup
            eventPropGetter={
              (event) => {
                let friendsStyle = {background: '#847FAC'};
                let selfStyle = {background: '#4236AC'};
                if(event.friends){
                  return { className: '', style: friendsStyle};
                }else{
                  return { className: '', style: selfStyle};
                }
              }
            }
            selectable
            onSelectEvent={event => this.setActiveEvent(event)}
            onSelectSlot={this.handleSelect}
          />
        </div>
        

        <fieldset>
          <input 
            type="checkbox" 
            name="show-friends" 
            checked={this.state.showFriends} 
            onChange={this.toggleFriends} 
            id="show-friends"
          />
          <label htmlFor="show-friends">Show Friend&apos;s Vacations</label>

          <input 
            type="checkbox" 
            name="show-self" 
            checked={this.state.showSelf}
            onChange={this.toggleSelf} 
            id="show-self"
          />
          <label htmlFor="show-self">Show My Vacations</label>
        </fieldset>

        <Link to="/new">New Vacations</Link>
      </main>
    );
  }
}

Vacations.propTypes = {
  history: PropTypes.object
};

export default Vacations;
