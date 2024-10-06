import React, { useEffect } from 'react';
import { useGetUsers } from 'features/users';
import { useNavigate } from 'react-router-dom';
import {
  tableStyle,
  headerStyle,
  rowStyle,
  cellStyle,
} from 'styling/TableStyles';

const containerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
};

const MAX_CACHE_TIME = 300000; // Cache user data for 5 minutes

const UserList: React.FC = () => {
  const { getUsers, users, isLoading, lastFetched } = useGetUsers();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const shouldFetchData =
          !lastFetched || Date.now() - lastFetched > MAX_CACHE_TIME;
        if (shouldFetchData) {
          await getUsers();
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div style={containerStyle}>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <h2 style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Users and Vehicles
          </h2>
        </div>
        {isLoading && <p>Loading users...</p>}
        {users?.length > 0 && (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerStyle}>User ID</th>
                <th style={headerStyle}>Name</th>
                <th style={headerStyle}>Number of Vehicles</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(user => user && Object.keys(user).length > 0)
                .map(user => (
                  <tr
                    key={user.userid}
                    style={rowStyle}
                    onClick={() => handleUserClick(user.userid)}
                    onMouseEnter={e =>
                      (e.currentTarget.style.backgroundColor = '#f2f2f2')
                    }
                    onMouseLeave={e =>
                      (e.currentTarget.style.backgroundColor = 'white')
                    }
                  >
                    <td style={cellStyle}>{user.userid}</td>
                    <td style={cellStyle}>
                      {user.owner?.name} {user.owner?.surname}
                    </td>
                    <td style={cellStyle}>{user.vehicles?.length || 0}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserList;
