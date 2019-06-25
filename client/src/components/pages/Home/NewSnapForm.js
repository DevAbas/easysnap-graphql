import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_SNAP, GET_SNAPS } from '../../../queries';

function NewSnapForm({ session }) {
  const [text, setText] = useState('');
  const [user_id, setUserId] = useState('');

  useEffect(() => {
    function changeInitialText() {
      if (session && session.activeUser) {
        setUserId(session.activeUser.id);
      }
    }
    changeInitialText();
  }, [session]);

  const onSubmitHandler = (e, addSnap) => {
    e.preventDefault();
    if (text.trim() !== '') {
      setText('');
      addSnap().then(({ data }) => console.log(data));
    }
  };

  const updateCache = (cache, { data: { createSnap } }) => {
    const { snaps } = cache.readQuery({
      query: GET_SNAPS,
    });
    cache.writeQuery({
      query: GET_SNAPS,
      data: {
        snaps: [createSnap, ...snaps],
      },
    });
  };

  // Optimistic response parametrs
  const optimisticResponse = {
    __typename: 'Mutation',
    createSnap: {
      __typename: 'Snap',
      id: Math.round(Math.random() * -200000),
      text,
      createdAt: new Date(),
      user: {
        __typename: 'User',
        ...session.activeUser,
      },
    },
  };
  return (
    <div>
      <Mutation
        mutation={ADD_SNAP}
        variables={{ text, user_id }}
        // refetchQueries={[{ query: GET_SNAPS }]}>
        update={updateCache}
        optimisticResponse={optimisticResponse}>
        {(addSnap, { loading, error }) => (
          <form onSubmit={e => onSubmitHandler(e, addSnap)}>
            <input
              className='add-snap__input'
              type='text'
              value={text}
              onChange={e => setText(e.target.value)}
              disabled={!(session && session.activeUser)}
              placeholder={
                session && session.activeUser
                  ? 'add snap'
                  : 'Please login to add a new snap'
              }
            />
          </form>
        )}
      </Mutation>
    </div>
  );
}

export default NewSnapForm;
