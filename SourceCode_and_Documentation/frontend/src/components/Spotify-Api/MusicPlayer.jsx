import React from "react";
import {Card} from "@material-ui/core";
import PropTypes from 'prop-types';

const MusicPlayer = ({ songUri }) => {
  const uri = songUri.split(':')[2];
  const url = `https://open.spotify.com/embed/track/${uri}`;

  return (    
    <Card>
      <iframe src={url} width="300" height="80" allow="encrypted-media"></iframe>
    </Card>
  );
}
export default MusicPlayer

MusicPlayer.propTypes = {
  songUri: PropTypes.string.isRequired,
}