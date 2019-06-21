import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import './index.css';
import App from './components/App';

const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
