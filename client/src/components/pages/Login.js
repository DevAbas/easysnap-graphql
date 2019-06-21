import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import Error from '../Error';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const formInvalid = () => {
    const isInvalid = !username || !password;
    return isInvalid;
  };

  const onSubmitHandler = (e, signInUser) => {
    e.preventDefault();
    signInUser()
      .then(
        ({ data }) => localStorage.setItem('token', data.signInUser.token),
        setUsername(''),
        setPassword('')
      )
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
        {(signInUser, { loading, error }) => (
          <form
            className='user-form'
            onSubmit={e => onSubmitHandler(e, signInUser)}>
            <label>
              <input
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder='username'
              />
            </label>
            <label>
              <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='password'
              />
            </label>
            <label>
              <button disabled={loading || formInvalid()}>Login</button>
            </label>
            {loading && <div>Loading...</div>}
            {error && <Error error={error} />}
          </form>
        )}
      </Mutation>
    </div>
  );
}

export default Login;
