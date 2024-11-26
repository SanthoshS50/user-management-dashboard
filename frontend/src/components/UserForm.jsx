import React, { useState, useEffect } from 'react';
import { addUser, updateUser } from '../api';

const UserForm = ({ setUsers, users, editingUser, setEditingUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  // If editingUser is provided, pre-fill the form
  useEffect(() => {
    if (editingUser) setFormData(editingUser);
  }, [editingUser]);

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    let newErrors = { firstName: '', lastName: '', email: '', department: '' };

    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
      isValid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last Name is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (editingUser) {
        // Update existing user
        updateUser(editingUser._id, formData).then(() => {
          setUsers(users.map((user) => (user._id === editingUser._id ? formData : user)));
          setEditingUser(null); // Clear the editing state
          setFormData({ firstName: '', lastName: '', email: '', department: '' });
        });
      } else {
        // Add new user
        addUser(formData).then((response) => {
          setUsers([...users, response.data]);
          setFormData({ firstName: '', lastName: '', email: '', department: '' });
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      {errors.firstName && <p className="error">{errors.firstName}</p>}

      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      {errors.lastName && <p className="error">{errors.lastName}</p>}

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <input
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Department"
      />
      {errors.department && <p className="error">{errors.department}</p>}

      <button type="submit">{editingUser ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default UserForm;
