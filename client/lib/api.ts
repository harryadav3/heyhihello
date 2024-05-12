import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers:{
    'Content-Type': 'application/json',
  }
});

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const addFriend = async (userId: string, friendId: string, token: string) => {
  try {
    const response = await api.put(`/users/${userId}/friends`, { friendId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add friend');
  }
};

export const updateStatus = async (userId: string, status: string, token: string) => {
  try {
    const response = await api.put(`/users/${userId}/status`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update status');
  }
};

export const sendMessage = async (sender: string, receiver: string, content: string, token: string) => {
  try {
    const response = await api.post('/chats', { sender, receiver, content }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to send message');
  }
};

export const getMessages = async (userId: string, token: string) => {
  try {
    const response = await api.get(`/chats/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get messages');
  }
};

export const searchUsers = async (search: string, token: string) => {
  try {
    const response = await api.get(`/users/search?search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to search users');
  }
};