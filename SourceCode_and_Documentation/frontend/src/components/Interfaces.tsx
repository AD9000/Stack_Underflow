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
  location?: string;
  song?: {
    artist?: string;
    album?: string;
    name?: string;
    uri?: string;
  };
  coords: [number, number];
  desc: string;
}

export interface tpp extends TagInfo {
  index: number;
  sstate: Function;
}
