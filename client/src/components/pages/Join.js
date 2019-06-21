import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { CREATE_USER } from '../../queries';
import Error from '../Error';

function Join() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const formInvalid = () => {
    const isInvalid =
      !username ||
      !password ||
      !passwordConfirm ||
      password !== passwordConfirm;

    return isInvalid;
  };

  const onSumitHandler = (e, createUser) => {
    e.preventDefault();
    createUser()
      .then(
        ({ data }) => localStorage.setItem('token', data.createUser.token),
        setUsername(''),
        setPassword(''),
        setPasswordConfirm('')
      )
      .catch(err => console.log(err));
  };
  return (
    <div>
      <Mutation mutation={CREATE_USER} variables={{ username, password }}>
        {(createUser, { loading, error }) => (
          <form
            className='user-form'
            onSubmit={e => onSumitHandler(e, createUser)}>
            <label>
              <input
                type='text'
                name='username'
                placeholder='username'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </label>
            <label>
              <input
                type='password'
                name='password'
                placeholder='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>
            <label>
              <input
                type='password'
                name='passwordConfirm'
                placeholder='confirm password'
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
              />
            </label>
            <label>
              <button disabled={loading || formInvalid()}>Join</button>
            </label>
            {loading && <div>Loading...</div>}
            {error && <Error error={error} />}
          </form>
        )}
      </Mutation>
    </div>
  );
}

export default Join;
