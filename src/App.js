/* eslint-disable jsx-a11y/img-redundant-alt */
import './App.css';

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect, useState } from 'react';

function App() {
  const clientId = '835466892579-uloljkafh774931eg5vpm23ak3jmnjqv.apps.googleusercontent.com';
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });


  const onSuccess = (res) => {
    setProfile(res.profileObj);
    console.log('success:', res);
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };
  const logOut = () => {
    setProfile(null);
  };


  return (
    <div className="App">
      <div className='auth-btns'>
        <br />
        <br />
        {profile ? (
          <div>
            <img src={profile.imageUrl} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
          </div>
        ) : (
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        )}
      </div>
    </div>
  );
}

export default App;
