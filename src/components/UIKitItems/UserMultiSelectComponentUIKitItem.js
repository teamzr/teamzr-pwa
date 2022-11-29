import * as React from 'react';
import UserMultiSelectComponent from '../UserMultiSelectComponent/UserMultselectComponent';

export default function UserMultiselectComponentUiKitItem(props) {
  const [value, setValue] = React.useState([]);

  const data = [
    {
      value: '1',
      label: 'da',
    },
    {
      value: '2',
      label: 'al',
    },
  ];

  const onChange = (eventValue) => {
    setValue(
      typeof eventValue === 'string' ? eventValue.split(',') : eventValue
    );
  };

  return (
    <UserMultiSelectComponent
      value={value}
      onChange={onChange}
      options={data}
    />
  );
}
