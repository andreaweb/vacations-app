import React from 'react';
import ReactDOM from 'react-dom';
import NewGroup from './NewGroup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewGroup />, div);
  ReactDOM.unmountComponentAtNode(div);
});
