import * as React from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';

function PlanListItemComponent(props) {
  const { campaignId, name } = props;
  const router = useRouter();

  const handleClick = React.useCallback(() => {
    router.push('/plans/[planId]', `/plans/${campaignId}`);
  }, [campaignId]);
  return <Button onClick={handleClick}>{name}</Button>;
}

PlanListItemComponent.propTypes = {
  name: propTypes.string,
  campaignId: propTypes.string,
};

export default PlanListItemComponent;
