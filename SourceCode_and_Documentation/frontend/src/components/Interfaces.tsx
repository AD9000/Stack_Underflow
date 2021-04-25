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
  imgFile?: File; // thanks, backend
}

export interface BackendTagBare {
  region: string;
  title: string;
  location: string;
  song_uri: string;
  caption: string;
}

export interface BackendTag extends BackendTagBare {
  username: string;
  image: any;
}

export interface tpp extends TagInfo {
  index: number;
  sstate: Function;
}

const BackendTagToTagInfo = (backendTag: BackendTag) => {
  const { caption, image, location, region, song_uri, title } = backendTag;

  const latlngloc = location.split(" ").map((loc) => Number(loc)) as [
    number,
    number
  ];
  const tagInfo: TagInfo = {
    region,
    imgurl: "",
    title,
    coords: latlngloc,
    song: {
      uri: song_uri,
    },
    desc: caption,
  };

  return tagInfo;
};

export { BackendTagToTagInfo };
