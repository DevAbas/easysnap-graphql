import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const onClickHandler = (history, client) => {
  localStorage.setItem('token', '');
  history.push('/');
  client.resetStore();
};

function Logout({ history }) {
  return (
    <ApolloConsumer>
      {client => (
        <button onClick={() => onClickHandler(history, client)}>Logout</button>
      )}
    </ApolloConsumer>
  );
}

export default withRouter(Logout);
