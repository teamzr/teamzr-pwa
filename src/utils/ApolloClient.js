import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import Cookies from 'js-cookie';
import { setContext } from 'apollo-link-context';

const authLink = setContext(async (_, { headers }) => {
  const token = Cookies.get('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  credentials: 'same-origin',
});

const error = onError(({ response, operation, networkError }) => {});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, error, httpLink]),
});

export default client;
