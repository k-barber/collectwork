import React, { useState } from 'react';
import * as Bootstrap from "react-bootstrap";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const providersNames = [
  'discord',
  'facebook',
  'cognito',
  'github',
  'google',
  'instagram',
  'linkedin',
  'reddit',
  'twitch',
  'twitter',
  'vk',
  'auth0',
];

const LoginButton = (props : any) => <a href={`${backendUrl}/api/connect/${props.providerName}`}>
    <button style={{ width: '150px' }}>Connect to {props.providerName}</button>
  </a>;

const LogoutButton = (props : any) => <button onClick={props.onClick}></button>;

const Home = (props: any) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('jwt'));

  const logout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    setIsLogged(false);
  };

  let buttons;

  if (isLogged) {
    buttons = <Bootstrap.Button onClick={logout}>Logout</Bootstrap.Button>;
  } else {
    buttons = <ul style={{ listStyleType: 'none' }}>
      {providersNames.map((providerName, i) => <li key={providerName}>
        <LoginButton providerName={providerName}/>
        </li>)}
    </ul>;
  }

  let text;

  if (isLogged) {
    text = `Welcome ${localStorage.getItem('username')}, you are connected!`;
  } else {
    text = 'You are not connected. Please log in.';
  }

  return <div>
    <p>{text}</p>
    {buttons}
  </div>;
}

export default Home;
