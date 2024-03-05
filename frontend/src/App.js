import React, { useEffect, useState } from 'react';
//import { fetchProfile } from '../../backend/get_user_profile/script';

// imports are not allowed
async function fetchProfile(code) {
  const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${code}` }
  });

  return await result.json();
}

function App() {
    const [profile, setProfile] = useState({
      display_name: '',
      id: '',
      email: '',
      uri: '',
      href: '',
      images: [{ url: '' }]
    });
  
    const code = 'Enter Access Token Here';
    useEffect(() => {
      // TODO: Create fetchProfile Data from backend
      fetchProfile(code)
        .then(data => setProfile(data))
        .catch(error => console.error('Error fetching profile data:', error));
    }, []);
  
    return (
      <div>
        <h1>Display your Spotify Profile Data</h1>
  
        <section id="profile">
          <h2>Logged in as <span id="displayName">{profile.display_name}</span></h2>
          <img id="avatar" width="200" src={profile.images[0].url} alt="Profile" />
          <ul>
            <li>User ID: <span id="id">{profile.id}</span></li>
            <li>Email: <span id="email">{profile.email}</span></li>
            <li>Spotify URI: <a id="uri" href={profile.uri}>{profile.uri}</a></li>
            <li>Link: <a id="url" href={profile.href}>{profile.href}</a></li>
            <li>Profile Image: <span id="imgUrl">{profile.images[0].url}</span></li>
          </ul>
        </section>
      </div>
    );
  
  // This function simulates fetching profile data
  async function fetchProfileData() {
    
    return {
      display_name: 'Najel',
      id: '123456',
      email: 'xxx@gmail.com',
      uri: 'spotify:user:XXX',
      href: 'https://open.spotify.com/user/123456',
      images: [{ url: 'https://example.com/profile.jpg' }]
    };
  }
}

export default App;
