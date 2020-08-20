import * as React from 'react';
import propTypes from 'prop-types';

import HomePage from './index';

import DefaultLayout from '../pagesLayouts/DefaultLayout';

function Explore(props) {
  return <HomePage {...props} />;
}

export default Explore;
