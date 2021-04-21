import React from "react";
import {Card} from "@material-ui/core";
import PropTypes from 'prop-types';

const MusicPlayer = ({ songUri }) => {
  const uri = songUri.split(':')[2];
  const url = `https://open.spotify.com/embed/track/${uri}`;

  return (    
    <div style={{backgroundColor:  "#405B99", border: '1px solid  #405B99', margin: 0}}>
      <iframe style={{backgroundColor:  "#405B99"}} src={url} width="280" height="70" allow="encrypted-media"></iframe>
    </div>
  );
}
export default MusicPlayer

MusicPlayer.propTypes = {
  songUri: PropTypes.string.isRequired,
}