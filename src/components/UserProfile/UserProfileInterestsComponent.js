import * as React from 'react';
import propTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { PlusIcon } from '../../constants/Icons';
import { CircularProgress } from '@material-ui/core';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function UserProfileInterestsComponent({
  options = [],
  value = [],
  onChange,
  loading,
  disabled,
}) {
  const [inputValue, setInputValue] = React.useState('');

  const onAutocompleteChange = (event, selectedOpt) => {
    onChange(selectedOpt);
    setInputValue('');
  };

  const onInputChange = (event) => {
    const val = event?.target?.value;
    setInputValue(val);
  };

  const filterOptions = (options, state) => {
    const result = options.filter((opt) => {
      return (
        opt.name.startsWith(state.inputValue) &&
        !value.find((elm) => opt.name == elm.name)
      );
    });

    if (result.length < 2 && inputValue != '') {
      const newItem = { id: null, name: inputValue };
      result.push(newItem);
    }
    return result;
  };

  const getOptionSelected = (val, opt) => {
    return val.id == opt.id;
  };

  return (
    <Autocomplete
      fullWidth={true}
      multiple
      disabled={disabled}
      id="userprofile-interests"
      value={value}
      onChange={onAutocompleteChange}
      options={options}
      loading={loading}
      getOptionSelected={getOptionSelected}
      disableCloseOnSelect
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.name}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          {option.id == null ? (
            <>
              <PlusIcon
                style={{ width: 15, height: 15, margin: '-1px 5px 0px -10px' }}
                color={'textSecondary'}
              />
            </>
          ) : (
            false
          )}
          {option.name}
        </React.Fragment>
      )}
      inputValue={inputValue}
      onInputChange={onInputChange}
      color={'primary'}
      ChipProps={{
        color: 'primary',
        [disabled && 'onDelete']: !disabled,
        disabled: false,
        style: { fontSize: '18px' },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          style={{ background: 'transparent' }}
          fullWidth={true}
          label={false}
          variant={'standard'}
          placeholder={!disabled && 'Find or create Interest'}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
            [disabled && 'endAdornment']: false,
            disableUnderline: true,
            fullWidth: true,
          }}
        />
      )}
    />
  );
}

export default UserProfileInterestsComponent;
