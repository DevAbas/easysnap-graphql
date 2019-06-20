import React, { useState } from 'react';

function Join() {
  const [state, setState] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const onChangeHandler = e => {
    setState({
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <form class='user-form'>
        <label>
          <input
            type='text'
            name='username'
            placeholder='username'
            value={state.username}
            onChange={onChangeHandler}
          />
        </label>
        <label>
          <input
            type='password'
            name='password'
            placeholder='password'
            value={state.password}
            onChange={onChangeHandler}
          />
        </label>
        <label>
          <input
            type='password'
            name='passwordConfirm'
            placeholder='confirm password'
            value={state.passwordConfirm}
            onChange={onChangeHandler}
          />
        </label>
        <label>
          <button>Join</button>
        </label>
      </form>
    </div>
  );
}

export default Join;
