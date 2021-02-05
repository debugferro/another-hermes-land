import React from 'react';
import AvatarCanvas from '../containers/avatar_canvas';
import Showcase from '../containers/showcase';
import Save from '../containers/save';
import GenderChange from '../containers/gender_change';

export default function App(props) {
  const { token, avatarId } = props;
  return (
    <div className="studio-container">
      <div className="studio-superior">
        <div className="menu-container">
          <div className="menu-content">
            <Save token={token} id={avatarId} />
            <GenderChange token={token} id={avatarId} gender={1} />
            <GenderChange token={token} id={avatarId} gender={-1} />
          </div>
        </div>
        <AvatarCanvas id={avatarId} />
      </div>
      <div className="studio-inferior">
        <Showcase />
      </div>
    </div>
  );
}
