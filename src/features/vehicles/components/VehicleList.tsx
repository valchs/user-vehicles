import React from 'react';
import { User } from 'types/user';
import { useGetVehicleLocations } from 'features/vehicles';

interface VehicleListProps {
  user: User | undefined;
}

const VehicleList: React.FC<VehicleListProps> = ({ user }) => {
  const { getVehicleLocations, vehicleLocations } = useGetVehicleLocations();
  const test = () => {
    getVehicleLocations(3);
    console.log(vehicleLocations);
  };
  return (
    <div>
      User: {user?.userid}
      <button onClick={test}>test</button>
    </div>
  );
};

export default VehicleList;
