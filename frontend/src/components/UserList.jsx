import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../api';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers().then((response) => setUsers(response.data));
  }, []);

  const handleDelete = (id) => {
    deleteUser(id).then(() => setUsers(users.filter((user) => user._id !== id)));
  };

  return (
    <div>
      <UserForm
        setUsers={setUsers}
        users={users}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
