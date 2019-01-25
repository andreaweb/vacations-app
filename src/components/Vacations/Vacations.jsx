import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Calendar from 'rc-calendar';
import 'rc-calendar/assets/index.css';
import './Vacations.scss';

class Vacations extends Component {
  state = {

  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="home">
        <h1>Vacations</h1>
        <Calendar />

        <fieldset>
          <input type="checkbox" name="show-friends" id="show-friends"/>
          <label htmlFor="show-friends">Show Friend&apos;s Vacations</label>

          <input type="checkbox" name="show-self" id="show-self"/>
          <label htmlFor="show-self">Show My Vacations</label>
        </fieldset>
      </main>
    );
  }
}

Vacations.propTypes = {

};

export default Vacations;
