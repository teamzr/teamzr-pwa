import * as React from 'react';
import propTypes from 'prop-types';
import { InputBase, makeStyles } from '@material-ui/core';

import { SearchIcon } from '../constants/Icons';

function SearchBarComponent(props) {
  const classes = useSearchBarComponent();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
}

const useSearchBarComponent = makeStyles((theme) => ({
  search: {
    position: 'relative',
    border: '1px solid #757575',
    borderRadius: theme.spacing(4),
    height: theme.spacing(6),
    padding: theme.spacing(1),
    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
  searchIcon: {
    float: 'left',
    marginRight: theme.spacing(2),
    marginTop: '3px',
  },
  inputRoot: {
    width: `calc(100% - ${theme.spacing(5)}px)`,
    '&:focus': {
      borderColor: theme.palette.primary.main,
    },
  },
  inputInput: {},
}));

export default SearchBarComponent;
