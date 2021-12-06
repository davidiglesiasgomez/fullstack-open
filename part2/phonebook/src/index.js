import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const persons = [
  {
    name: 'Arto Hellas',
    phone: '040-123456'
  }
]

ReactDOM.render(
  <App persons={persons} />,
  document.getElementById('root')
);
