import * as React from 'react';
import ChipSelectComponent from '../ChipSelectComponent/ChipSelectComponent';

export default function DurationSelect(props) {
  const { value, onChange } = props;
  const options = [
    { value: 'DAY', label: '1 Day' },
    { value: 'WEEK', label: '1 Week' },
    { value: 'WEEK2', label: '2 Weeks' },
    { value: 'MONTH', label: '1 Month' },
  ];

  return (
    <ChipSelectComponent value={value} options={options} onChange={onChange} />
  );
}
