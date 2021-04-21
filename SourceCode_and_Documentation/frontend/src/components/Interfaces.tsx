export interface TagPrevProps {
  title: string;
  location: string;
  album: string;
  desc: string;
  imgurl: string;
}

export interface TagInfo {
  region?: string;
  username?: string;
  imgurl: string;
  title: string;
  location: string;
  songName?: string;
  songArtist?: string;
  songUri?: string;
  desc: string;
}

export interface tpp extends TagInfo {
  album: string;
  index: number;
  sstate: Function;
}
