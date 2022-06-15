import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import Cookies from 'js-cookie';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';

const authLink = setContext(async (_, { headers }) => {
  const token = Cookies.get('token') || req.header('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  credentials: false,
});

const error = onError(({ response, operation, networkError }) => {
  if (networkError?.statusCode == 400) {
    //TODO
  }
});

const client = new ApolloClient({
  // TODO: After is ssrMode set to true – pollintarvel does not work
  ssrMode: false,
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, error, httpLink]),
});

export default client;
