import * as React from 'react';
import Cookies from 'js-cookie';
import { gql } from '@apollo/client';

import apolloClient from '../utils/ApolloClient';
import axios from '../utils/Axios';
import { useRouter } from 'next/router';
import { notAuthFallback } from '../constants/AuthFallback';

const getUserFromToken = async (token) => {
  const result = await apolloClient.query({
    query: gql`
      {
        me {
          id
          name
        }
      }
    `,
  });

  return result?.data?.me;
};

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  React.useEffect(() => {
    async function getUserFromCookies() {
      const token = Cookies.get('token');
      if (token) {
        const user = await getUserFromToken(token);
        setUser(user);
      }

      setLoading(false);
    }

    getUserFromCookies();
  }, []);

  const login = React.useCallback(async (email, password) => {
    try {
      const res = await axios.post('/auth', { email, password });
      const token = res.data && res.data.token;

      Cookies.set('token', token);
      const user = await getUserFromToken(token);

      setUser(user);
      setLoading(false);
      return user;
    } catch (e) {
      throw { message: 'Invalid name or password!' };
    }
  }, []);

  const logout = React.useCallback(() => {
    Cookies.remove('token');
    setUser(null);
    apolloClient.resetStore();
    if (typeof window !== 'undefined') {
      router.push(notAuthFallback);
      window.location.pathname = '/';
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ loading, isAuthenticated: !!user, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuthContext() {
  return React.useContext(AuthContext);
}

export default useAuthContext;
