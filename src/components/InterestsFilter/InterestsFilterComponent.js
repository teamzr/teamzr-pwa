import * as React from 'react';
import propTypes from 'prop-types';
import { Chip, makeStyles } from '@material-ui/core';

function InterestsFilterComponent(props) {
  const { interests, onChange, value } = props;
  const classes = useInterestsFilterComponent();
  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <li>
          <Interest
            data={{ id: null, name: 'All' }}
            onClick={onChange}
            variant={value == null ? 'default' : 'outline'}
            className={classes.chip}
          />
        </li>
        {interests.map((interest, i) => {
          return (
            <li key={i}>
              <Interest
                data={interest}
                onClick={onChange}
                variant={value == interest.id ? 'default' : 'outline'}
                className={classes.chip}
              />
            </li>
          );
        })}
      </div>
    </div>
  );
}

const useInterestsFilterComponent = makeStyles((theme) => ({
  container: {
    maxWidth: '100vw',
    textOverflow: 'scroll',
    overflowX: 'scroll',
  },
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function Interest({ data, onClick, variant, ...rest }) {
  const onClicked = () => {
    onClick(data.id);
  };
  return (
    <Chip
      label={data.name}
      size={'medium'}
      onClick={onClicked}
      color={'primary'}
      variant={variant}
      {...rest}
    />
  );
}

export default InterestsFilterComponent;
