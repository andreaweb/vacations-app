import React from 'react';
import ReactDOM from 'react-dom';
import VacationDetails from './VacationDetails';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VacationDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});
