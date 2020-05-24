import React from 'react';
import { render } from 'react-dom';
import Welcome from './components/Welcome';

require('./bootstrap');

render(<Welcome/>, document.getElementById('root'));
