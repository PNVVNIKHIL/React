// FacebookLoginComponent.jsx
import { useState, useEffect } from 'react';

function FacebookLoginComponent() {
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

    // Load the SDK script
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(
      (response) => {
        if (response.status === 'connected') {
          // Fetch user info from Facebook API
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

  return (
    <>
      {!isLoggedIn ? (
        <button onClick={handleFacebookLogin}>Login with Facebook</button>
      ) : (
        <h2>Welcome {userName}</h2>
      )}
    </>
  );
}

export default FacebookLoginComponent;
