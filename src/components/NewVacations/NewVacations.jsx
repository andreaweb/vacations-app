import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './NewVacations.scss';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

class NewVacations extends Component {
  state = {
    name: ''
  };

  constructor(props) {
    super(props);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleSubmit = () => {
   
  }

  render() {
    return (
      <main className="new-vacations">
       
      </main>
    );
  }
}

NewVacations.propTypes = {

};

export default NewVacations;
