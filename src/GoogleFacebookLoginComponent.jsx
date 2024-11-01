import  { useState, useEffect } from 'react';
import {  GoogleLogin } from '@react-oauth/google';

function GoogleFacebookLoginComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Initialize Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1488246822565901', // Your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v15.0',
      });
    };

    // Load the SDK script for Facebook
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  const handleGoogleSuccess = (credentialResponse) => {
    const userProfile = decodeJwt(credentialResponse.credential);
    setUserName(userProfile.name);
    setIsLoggedIn(true);
  };

  const handleFacebookLogin = () => {
    window.FB.login(
      (response) => {
        if (response.status === 'connected') {
          window.FB.api('/me', { fields: 'name,email' }, (profile) => {
            setUserName(profile.name);
            setIsLoggedIn(true);
          });
        } else {
          console.log('Facebook login failed');
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  const decodeJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <GoogleLogin onSuccess={handleGoogleSuccess} />
          <button onClick={handleFacebookLogin}>Login with Facebook</button>
        </>
      ) : (
        <h2>Welcome {userName}</h2>
      )}
    </>
  );
}

 export default GoogleFacebookLoginComponent;