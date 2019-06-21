import React from 'react';

function Error({ error: { message } }) {
  return <div>{message}</div>;
}

export default Error;
