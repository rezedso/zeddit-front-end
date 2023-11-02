import api from './api';

export const getUser = async (username) => {
  const { data } = await api.get(`/users/${username}`);
  return data;
};

export const getUsers = async () => {
  const { data } = await api.get(`/users`);
  return data;
};
