import React from 'react';
import ReactDOM from 'react-dom';
import Trociety from './Trociety';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Trociety />, div);
  ReactDOM.unmountComponentAtNode(div);
});
