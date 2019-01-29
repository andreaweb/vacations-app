import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../helpers/MUITheme.js';
import {Link} from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import './Vacations.scss';
import BigCalendar from 'react-big-calendar';
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
    type: 'date',
    selfVacations: []
  };

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.showVacations();
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

  showVacations = () => {
    //would have to loop json (friends' vacations) + localStorage (self vacations)
    //and replace '2019-01-20' with the corresponding dates
  }

  onSelect = (e) => {
    //call vacation details if there's any
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

        <div className="calendar-container">
          <BigCalendar
            localizer={localizer}
            events={friendsEvents.concat(this.state.selfVacations)}
            startAccessor="start"
            endAccessor="end"
            popup
            eventPropGetter={
              (event) => {
                let friendsStyle = {background: 'red'};
                if(event.friends){
                  return { className: '', style: friendsStyle};
                }
              }
            }
            selectable
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={this.handleSelect}
          />
        </div>
        

        <fieldset>
          <input type="checkbox" name="show-friends" id="show-friends"/>
          <label htmlFor="show-friends">Show Friend&apos;s Vacations</label>

          <input type="checkbox" name="show-self" id="show-self"/>
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
