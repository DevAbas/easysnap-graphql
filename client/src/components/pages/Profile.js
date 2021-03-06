import React from 'react';
import Moment from 'react-moment';
import AuthHOC from '../AuthHOC';

function Profile({ session: { activeUser } }) {
  return (
    <div>
      <h3>Profile</h3>

      <div>
        <Moment date={activeUser.createdAt} format='YYYY/MM/DD' />
      </div>

      <strong>@{activeUser.username}</strong>
    </div>
  );
}

export default AuthHOC(session => session && session.activeUser)(Profile);
