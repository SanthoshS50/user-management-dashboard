// api.js
import axios from 'axios';

const API_URL = 'https://user-management-dashboard-n6ie.onrender.com/api';

// Fetch all users
export const fetchUsers = () => axios.get(`${API_URL}/users`);

// Add a new user
export const addUser = (user) => axios.post(`${API_URL}/users`, user);

// Update an existing user
export const updateUser = (id, user) => axios.put(`${API_URL}/users/${id}`, user);

// Delete a user
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);
