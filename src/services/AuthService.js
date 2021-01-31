import axios from '../utils/Axios';

const AuthService = {
  signUp: async (data) => {
    const response = await axios.post('/register', data);

    return response;
  },
};

export default AuthService;
