import React from 'react';

import NewSnapForm from './NewSnapForm';
import SnapList from './SnapList';
import JoinedUs from './JoinedUs';

function Home({ session }) {
  return (
    <React.Fragment>
      <div className='description'>
        <p className='sub_header__desc'>
          simple snap app with <span>react</span>.
        </p>
      </div>
      <NewSnapForm session={session} />
      <JoinedUs />
      <SnapList />
    </React.Fragment>
  );
}

export default Home;
