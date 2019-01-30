import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  componentDidMount(){
    if(this.props.match.params.date){
      this.setState({start: this.props.match.params.date});
    }
    if(this.props.match.params.event){
      let search = 'vacations'+this.props.match.params.event;
      let values = Object.keys(localStorage).filter( (key)=> key.startsWith(search) );
      if(values){
          let storedData = localStorage.getItem(values);
          let newObj = JSON.parse(storedData);
          for(let k in newObj){
            if(k === 'start' || k === 'end'){
              let formatDate = moment(newObj[k]).format('YYYY-MM-DD');
              this.setState({[k]: formatDate });
            }else{
              this.setState({[k]: newObj[k] });
            }
          }
      }
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleSubmit = () => {
   if(this.state.title && this.state.start){
    let today = moment(new Date()).format('YYYY-MM-DD');
    if(this.state.start < today){
      alert('Invalid start date, cannot plan or change the past!');
    }else if(this.state.end < this.state.start){
      alert('Invalid end date, cannot be before start!');
    }else if(this.props.match.params.event){
      this.saveLocalStorage(this.props.match.params.event);
      alert('Vacations saved');
    }else{
      this.saveLocalStorage();
      alert('Vacations saved');
    }
   }else{
    alert('Title and Start Date are mandatory.');
   }
  }

  saveLocalStorage = (id) => {
    let vacations = {};
    let randomNum = id || Math.floor(Math.random() * (0-99999));
    
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
  match: PropTypes.object
};

export default NewVacations;
