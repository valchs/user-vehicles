import React from 'react';
import { useGetUsers } from 'features/users';
import { useNavigate } from 'react-router-dom';

const UserList: React.FC = () => {
  const { getUsers, users } = useGetUsers();
  const navigate = useNavigate();

  const handleUserClick = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div>
      <button onClick={() => getUsers()}>Click</button>

      {users?.length > 0 ? (
        <div>
          <h2>Users and Vehicle Count</h2>
          <table
            border={1}
            cellPadding='10'
            style={{ borderCollapse: 'collapse', marginTop: '10px' }}
          >
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Number of Vehicles</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(user => user && Object.keys(user).length > 0) // Filter out empty user objects
                .map(user => (
                  <tr
                    key={user.userid}
                    onClick={() => handleUserClick(user.userid)}
                  >
                    <td>{user.userid}</td>
                    <td>
                      {user.owner?.name} {user.owner?.surname}
                    </td>
                    <td>{user.vehicles?.length || 0}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users loaded yet.</p>
      )}
    </div>
  );
};

export default UserList;
