import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Vacations from './Vacations/Vacations.jsx';
import NewVacations from './NewVacations/NewVacations.jsx';
import './App.scss';

class App extends Component {
  state = {
    
  };

  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" render={()=><Vacations/>}/>
            <Route exact path="/new" render={()=><NewVacations/>}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
