import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import 'rc-calendar/assets/index.css';
import 'rc-select/assets/index.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../helpers/MUITheme.js';
import {Link} from 'react-router-dom';
import Select from 'rc-select';
import Chip from '@material-ui/core/Chip';
import enUS from 'rc-calendar/lib/locale/en_US';
import './Vacations.scss';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const now = moment();

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

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
    //it's storing the values individuals, they should be gathered instead
    // let search = 'vacations';
    // let values = Object.keys(localStorage)
    //                .filter( (key)=> key.startsWith(search) )
    //                .map( (key)=> localStorage[key] );
    // this.setState({selfVacations: values});
  }

  showVacations = () => {
    //would have to loop json (friends' vacations) + localStorage (self vacations)
    //and replace '2019-01-20' with the corresponding dates
    let formatDate = moment('2019-01-20', 'YYYY-MM-DD').format('DD MMMM YYYY');
    let day = document.querySelectorAll(`[title="${formatDate}"]`)[0];
    let dayDiv = day.querySelectorAll('div')[0];
    let spanNode = document.createElement('SPAN');
    spanNode.className = 'data';
    let textNode = document.createTextNode('*');
    spanNode.appendChild(textNode);
    dayDiv.appendChild(spanNode);
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
        <FullCalendar
          style={{ margin: 10 }}
          Select={Select}
          defaultValue={now}
          onSelect={this.onSelect}
          type={this.state.type}
          onTypeChange={this.onTypeChange}
          locale={enUS}
        />

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
