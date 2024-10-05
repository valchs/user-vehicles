import React, { useEffect } from 'react';
import { User } from 'types/user';
import { useGetVehicleLocations } from 'features/vehicles';

interface VehicleListProps {
  user: User | undefined;
}

const VehicleList: React.FC<VehicleListProps> = ({ user }) => {
  const { getVehicleLocations, vehicleLocations } = useGetVehicleLocations();

  const test = (id: number) => {
    console.log(id);
  };
  return (
    <div>
      {' '}
      {user && user.vehicles && user.vehicles.length > 0 && (
        <div style={{ margin: '20px 0' }}>
          <table
            border={1}
            cellPadding={10}
            style={{ borderCollapse: 'collapse', width: '100%' }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th>Vehicle ID</th>
                <th>Make</th>
                <th>Model</th>
              </tr>
            </thead>
            <tbody>
              {user.vehicles.map(vehicle => (
                <tr
                  key={vehicle.vehicleid}
                  onClick={() => test(vehicle.vehicleid)}
                >
                  <td>{vehicle.vehicleid}</td>
                  <td>{vehicle.make}</td>
                  <td>{vehicle.model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VehicleList;
