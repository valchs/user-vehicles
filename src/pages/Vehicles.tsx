import React from 'react';
import { useGetUsers } from 'features/users';
import { useParams } from 'react-router-dom';
import VehicleList from 'features/vehicles/components/VehicleList';
import Map from 'features/vehicles/components/Map';

const homePageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  padding: '20px',
  gap: '20px',
} as const;

const UserDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { users } = useGetUsers();
  const user = users?.find(user => user.userid.toString() === id);

  return (
    <div style={homePageStyle}>
      <VehicleList user={user} />
      <Map user={user} />
    </div>
  );
};

export default UserDetailsPage;
