// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './profileButton';

import './navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink exact to="/songs" className='link'>My Songs</NavLink>
        <NavLink to='/songs/upload' className='link'>Upload</NavLink>
        <ProfileButton id='user-logo' user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" className='link'>Log In</NavLink>
        <NavLink to="/signup" className='link'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <>
      <ul>
        <li className='nav'>
          <NavLink exact to="/" id='title'>Noise-Storm</NavLink>
          <div className='links'>
            {isLoaded && sessionLinks}
          </div>
        </li>
      </ul>
      <hr/>
    </>
  );
}

export default Navigation;