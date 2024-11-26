const express = require('express');
const router = express.Router();
const axios = require('axios');

// JSONPlaceholder URL
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch all users
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Fetch a user by ID
router.get('/:id', async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

// Add a user
router.post('/', async (req, res) => {
    try {
        const response = await axios.post(API_URL, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
});

// Edit a user
router.put('/:id', async (req, res) => {
    try {
        const response = await axios.put(`${API_URL}/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error editing user', error });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const response = await axios.delete(`${API_URL}/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

module.exports = router;
