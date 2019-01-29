import React from 'react';
import ReactDOM from 'react-dom';
import NewVacations from './NewGroup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewVacations />, div);
  ReactDOM.unmountComponentAtNode(div);
});
