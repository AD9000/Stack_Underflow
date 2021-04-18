// import React from "react";
import { useHistory } from 'react-router-dom';
import { handleRedirect } from '../components/Spotify-Api/spotifyApi';

// Change name
export default function RegisterSuccess() {

  let history = useHistory();

  const handleButton = () => {
    history.push('/home');
  }

  // Removes code from url, and uses it to fetch access/refresh tokens
  handleRedirect();

  return (
    <div>
      <h1>
        success
      </h1>
      <button onClick={handleButton}>Done</button>
    </div>
  );
}

export { RegisterSuccess };