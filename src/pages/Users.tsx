import UserList from 'features/users/components/UserList';
import React from 'react';

const homePageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#333',
  fontSize: '24px',
  padding: '20px',
} as const;

const UsersPage: React.FC = () => {
  return (
    <div style={homePageStyle}>
      <UserList />
    </div>
  );
};

export default UsersPage;
