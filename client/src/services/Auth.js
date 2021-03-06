import Client from './api';

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth/signup', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const SignInUser = async (data, setMessageState) => {
  try {
    const res = await Client.post('/auth/login', data);
    localStorage.setItem('id', res.data.user.id);
    localStorage.setItem('token', res.data.token);
    return res.data.user;
  } catch (error) {
    setMessageState('Invalid username/password');
    throw error;
  }
};

export const CheckSession = async () => {
  try {
    const res = await Client.get('/auth/session');
    return res.data;
  } catch (error) {
    throw error;
  }
};
