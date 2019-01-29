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
            <Route exact path="/" render={(props)=> <Vacations {...props} />}/>
            <Route exact path="/new/:date?" render={(props)=><NewVacations {...props} />}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {

};

export default App;
