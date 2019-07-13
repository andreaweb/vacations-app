import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../helpers/MUITheme.js';
import {Link} from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Button from './Button';
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
function Vacations(props) {
  const [showSelf, setShowSelf] = useState(true);
  const [showFriends, setShowFriends] = useState(true);
  const [activeEvent, setActiveEvent] = useState();
  const [hideChip, setHideChip] = useState(false);
  const [selfVacations, setSelfVacations] = useState([]);
  const [currentVacations, setCurrentVacations] = useState([]);

  useEffect(()=> searchVacations());

  const searchVacations = () => {
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
      let arrCopy = selfVacations;
      arrCopy.push(...vacations);
      setSelfVacations(arrCopy);
    }
  };

  const toggleFriends = () => {
    let bool = !showFriends;
    let curVacations = currentVacations
        || friendsEvents.concat(selfVacations);
    if(bool){
      curVacations = currentVacations.filter(event => !event.friends).concat(friendsEvents);
    }else{
      curVacations = currentVacations.filter(event => !event.friends);
    }
    setShowFriends(bool);
    setCurrentVacations(curVacations);
  };

  const toggleSelf = () => {
    let bool = !showSelf;
    let curVacations = currentVacations 
        || friendsEvents.concat(selfVacations);
    if(bool){
      curVacations = currentVacations.filter(event => event.friends).concat(selfVacations);
    }else{
      curVacations = currentVacations.filter(event => event.friends);
    }
    setShowSelf(bool);
    setCurrentVacations(curVacations);
  };

  const handleSelect = e => {
    let dateParam = moment(e.start, 'MM DD YYYY').format('YYYY-MM-DD');
    props.history.push('/new/'+dateParam);
  };

  const handleClick = () => {
    props.history.push('/new');
  };

  const handleUnmount = (id) => {
    let arrCopy = selfVacations;
    let filtered = arrCopy.filter(event => event.id !== id);
    setActiveEvent(null);
    setSelfVacations(filtered);
  };

  return (
    <main className="home">
      <h1>Vacations</h1>
      { selfVacations.length === 0 && !hideChip && 
        <MuiThemeProvider theme={theme}>
          <Chip
            label="You haven't added any vacations yet. Add a new vacation."
            onClick={handleClick}
            onDelete={setHideChip(true)}
          />
        </MuiThemeProvider>
      }

      {
        activeEvent 
        && 
        <VacationDetails 
          history={props.history} 
          event={activeEvent} 
          unmountMe={(id) => handleUnmount(id)}
        />
      }

      <Button />

      <div className="calendar-container">
        <BigCalendar
          localizer={localizer}
          events={currentVacations || friendsEvents.concat(selfVacations)}
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
          onSelectEvent={event => setActiveEvent(event)}
          onSelectSlot={handleSelect}
        />
      </div>
      

      <fieldset>
        <input 
          type="checkbox" 
          name="show-friends" 
          checked={showFriends} 
          onChange={toggleFriends} 
          id="show-friends"
        />
        <label htmlFor="show-friends">Show Friend&apos;s Vacations</label>

        <input 
          type="checkbox" 
          name="show-self" 
          checked={showSelf}
          onChange={toggleSelf} 
          id="show-self"
        />
        <label htmlFor="show-self">Show My Vacations</label>
      </fieldset>

      <Link to="/new">New Vacations</Link>
    </main>
  );
}

Vacations.propTypes = {
  history: PropTypes.object
};

export default Vacations;
