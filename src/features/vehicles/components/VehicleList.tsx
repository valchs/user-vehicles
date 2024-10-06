import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'types/user';
import { useGetVehicleLocations } from 'features/vehicles';
import {
  tableStyle,
  headerStyle,
  rowStyle,
  cellStyle,
} from 'styling/TableStyles';

interface VehicleListProps {
  user: User | undefined;
}

const containerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
};
const buttonStyle: React.CSSProperties = {
  backgroundColor: '#f7f7f7',
  padding: '10px 16px',
  borderRadius: '3px',
  border: '1px solid #ddd',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const VehicleList: React.FC<VehicleListProps> = ({ user }) => {
  const navigate = useNavigate();
  const { setSelectedVehicleId } = useGetVehicleLocations();

  const vehicleSelected = (vehicleId: number) => {
    setSelectedVehicleId(vehicleId);
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <button style={buttonStyle} onClick={() => navigate('/')}>
          Go Back
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <h2 style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 0 }}>
          {user?.owner.name} {user?.owner.surname}
        </h2>
      </div>
      {user && user.vehicles && user.vehicles.length > 0 && (
        <div style={{ margin: '20px 0' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerStyle}>Vehicle ID</th>
                <th style={headerStyle}>Make</th>
                <th style={headerStyle}>Model</th>
                <th style={headerStyle}>VIN</th>
                <th style={headerStyle}>Year</th>
              </tr>
            </thead>
            <tbody>
              {user.vehicles.map(vehicle => (
                <tr
                  key={vehicle.vehicleid}
                  style={rowStyle}
                  onClick={() => vehicleSelected(vehicle.vehicleid)}
                  onMouseEnter={e =>
                    (e.currentTarget.style.backgroundColor = '#f2f2f2')
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.backgroundColor = 'white')
                  }
                >
                  <td style={cellStyle}>{vehicle.vehicleid}</td>
                  <td style={cellStyle}>{vehicle.make}</td>
                  <td style={cellStyle}>{vehicle.model}</td>
                  <td style={cellStyle}>{vehicle.vin}</td>
                  <td style={cellStyle}>{vehicle.year}</td>
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
