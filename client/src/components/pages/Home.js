import React, { useState, useEffect } from 'react';
import { Query, Mutation } from 'react-apollo';
import TimeAgo from 'react-timeago';
import { GET_SNAPS, ADD_SNAP } from '../../queries';

function Home({ session }) {
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

  const onSubmitHandler = (e, createSnap) => {
    e.preventDefault();
    if (text.trim() !== '') {
      createSnap().then(({ data }) => console.log(data));
      setText('');
    }
  };
  return (
    <React.Fragment>
      <div className='description'>
        <p className='sub_header__desc'>
          simple snap app with <span>react</span>.
        </p>
      </div>

      <div>
        <Mutation
          mutation={ADD_SNAP}
          variables={{ text, user_id }}
          refetchQueries={[{ query: GET_SNAPS }]}>
          {(createSnap, { loading, error }) => (
            <form onSubmit={e => onSubmitHandler(e, createSnap)}>
              <input
                className='add-snap__input'
                type='text'
                value={text}
                onChange={e => setText(e.target.value)}
                disabled={!(session && session.activeUser) || loading}
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
      <div>
        <ul className='snaps'>
          <Query query={GET_SNAPS}>
            {({ data, loading, error }) => {
              if (loading)
                return <div className='loading'>Loading snaps...</div>;
              if (error) return <div>Error</div>;
              return (
                <div>
                  <ul className='snaps'>
                    {data.snaps.map(snap => (
                      <li key={snap.id}>
                        <div className='title'>{snap.text}</div>
                        <div className='date'>
                          <span>@{snap.user.username} </span>
                          <span>
                            <TimeAgo date={snap.createdAt} />
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className='counter'>{data.snaps.length} snap(s)</div>
                </div>
              );
            }}
          </Query>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default Home;
