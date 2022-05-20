import Client from './api';

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth/signup', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
