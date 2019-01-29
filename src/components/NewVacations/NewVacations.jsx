import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './NewVacations.scss';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';

class NewVacations extends Component {
  state = {
  };

  constructor(props) {
    super(props);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleSubmit = () => {
   if(this.state.title && this.state.start){
    this.saveLocalStorage();
    alert('Vacations saved');
   }else{
    alert('Title and Start Date are mandatory.');
   }
  }

  saveLocalStorage = () => {
    let vacations = {};
    let randomNum = Math.floor(Math.random() * (0-99999));
    
    for(let k in this.state){
      if(this.state.hasOwnProperty(k)){
        if(k === 'start' || k === 'end'){
          let formatDate = moment(this.state[k], 'YYYY-MM-DD');
          vacations[k] = formatDate;
        }else{
          vacations[k] = this.state[k];
        } 
      }
    }
    if(!vacations['end']){
      vacations['end'] = vacations['start'];
    }
    vacations['id'] = randomNum;
    localStorage.setItem('vacations'+randomNum, JSON.stringify(vacations));
  }

  render() {
    return (
      <main className="new-vacations">
        <TextField
          id="title"
          label="Enter a title for your vacation"
          value={this.state.title}
          InputLabelProps={{shrink: true}}
          onChange={this.handleChange('title')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="date"
          label="Select the start day"
          type="date"
          value={this.state.start}
          InputLabelProps={{shrink: true}}
          onChange={this.handleChange('start')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="date"
          label="Select the end day (Optional)"
          type="date"
          value={this.state.end}
          InputLabelProps={{shrink: true}}
          onChange={this.handleChange('end')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="location"
          label="Where are you going? (Optional)"
          type="text"
          value={this.state.location}
          InputLabelProps={{shrink: true}}
          onChange={this.handleChange('location')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="additionalNotes"
          label="Additional Notes (Optional)"
          value={this.state.additionalNotes}
          InputLabelProps={{shrink: true}}
          onChange={this.handleChange('additionalNotes')}
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" onClick={this.handleSubmit} type="submit">Submit</Button>
        <Link to="/">Back to home</Link>
      </main>
    );
  }
}

NewVacations.propTypes = {

};

export default NewVacations;
