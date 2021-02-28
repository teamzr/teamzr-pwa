import * as React from 'react';
import propTypes from 'prop-types';

import HomePage from './index';

import DefaultLayout from '../pagesLayouts/DefaultLayout';
import AppBarComponent from '../components/AppBarComponent/AppBarComponent';

function Explore(props) {
  return (
    <DefaultLayout>
      <AppBarComponent />
      <HomePage {...props} />
    </DefaultLayout>
  );
}

export default Explore;
