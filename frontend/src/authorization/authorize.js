import React, { useState, useEffect } from 'react';
import './style.css';

const clientId = process.env.REACT_APP_CLIENT_ID; // your clientId
const redirectUrl = process.env.REACT_APP_REDIRECT_URL; // your redirect URL - must be localhost URL and/or HTTPS

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = 'user-read-private user-read-email';

function Authorize() {
  const [currentToken, setCurrentToken] = useState({
    access_token: localStorage.getItem('access_token') || null,
    refresh_token: localStorage.getItem('refresh_token') || null,
    expires_in: localStorage.getItem('refresh_in') || null,
    expires: localStorage.getItem('expires') || null
  });

  useEffect(() => {
    const fetchData = async () => {
      const args = new URLSearchParams(window.location.search);
      const code = args.get('code');

      if (code) {
        const token = await getToken(code);
        setCurrentToken(token);

        const url = new URL(window.location.href);
        url.searchParams.delete("code");

        const updatedUrl = url.search ? url.href : url.href.replace('?', '');
        window.history.replaceState({}, document.title, updatedUrl);
      }
    };

    fetchData();
  }, []);

  const getToken = async (code) => {
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUrl,
        code_verifier: localStorage.getItem('code_verifier'),
      }),
    });

    return await response.json();
  };

  const redirectToSpotifyAuthorize = async () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");

    const code_verifier = randomString;
    const data = new TextEncoder().encode(code_verifier);
    const hashed = await crypto.subtle.digest('SHA-256', data);

    const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    window.localStorage.setItem('code_verifier', code_verifier);

    const authUrl = new URL(authorizationEndpoint)
    const params = {
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      code_challenge_method: 'S256',
      code_challenge: code_challenge_base64,
      redirect_uri: redirectUrl,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
  };

  const refreshToken = async () => {
    // Implement your code here
  };

  const getUserData = async () => {
    const response = await fetch("https://api.spotify.com/v1/me", {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + currentToken.access_token },
  });

    return await response.json();
  };

  const loginWithSpotifyClick = async () => {
    await redirectToSpotifyAuthorize();
  };

  const logoutClick = () => {
    localStorage.clear();
    window.location.href = redirectUrl;
  };

  const refreshTokenClick = async () => {
    const token = await refreshToken();
    setCurrentToken(token);
  };

  const renderTemplate = () => {
    // Implement your code here
  };

  return (
    <div>
      <div id="main"></div>
      <div id="oauth"></div>

      <h1>Welcome to the OAuth2 PKCE Example</h1>
      <button id="login-button" onClick={loginWithSpotifyClick}> Log in with Spotify </button>

      {/* Implement your other HTML templates here */}
    </div>
  );
}

export default Authorize;
