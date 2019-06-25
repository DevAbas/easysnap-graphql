import React from 'react';
import TimeAgo from 'react-timeago';

function SnapListItem({ snap }) {
  return (
    <li className={snap.id < 0 ? 'optimistic' : ''}>
      <div className='title'>{snap.text}</div>
      <div className='date'>
        <span>@{snap.user.username} </span>
        <span>
          {snap.id < 0 ? 'Sendig...' : <TimeAgo date={snap.createdAt} />}
        </span>
      </div>
    </li>
  );
}

export default SnapListItem;
