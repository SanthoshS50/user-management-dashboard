import React from 'react';
import UserList from './components/UserList';

const App = () => {
  return (
    <div>
      <main className="container">
        <h1>User Management Dashboard</h1>
        <UserList />
      </main>
    </div>
  );
};

export default App;
