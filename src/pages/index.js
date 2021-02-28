import * as React from 'react';
import propTypes from 'prop-types';

import DefaultLayout from '../pagesLayouts/DefaultLayout';
import AppBarComponent from '../components/AppBarComponent/AppBarComponent';
import { useRouter } from 'next/router';

function Explore(props) {
  const router = useRouter();
  React.useEffect(() => {
    router.push(`/explore`);
  }, [router]);
  return <DefaultLayout></DefaultLayout>;
}

export default Explore;
