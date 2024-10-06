import UserList from 'features/users/components/UserList';
import React from 'react';
import { pageStyle } from 'styling/SharedStyles';

const UsersPage: React.FC = () => {
  return (
    <div style={pageStyle}>
      <UserList />
    </div>
  );
};

export default UsersPage;
