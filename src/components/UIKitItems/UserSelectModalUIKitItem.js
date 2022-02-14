import * as React from 'react';
import UserSelectModalComponent from '../UserSelectModal/UserSelectModalComponent';

const users = [
  { id: '1', avatar: 'none', name: 'Joe Doe', selected: true },
  { id: '1', avatar: 'none', name: 'Jan Doe', selected: true },
];

export default function UserSelectModalUIKitItem() {
  const [open, setOpen] = React.useState(true);

  return <UserSelectModalComponent open={open} users={users} />;
}
