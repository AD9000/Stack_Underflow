export interface TagPrevProps {
  title: string;
  location: string;
  album: string;
  desc: string;
  imgurl: string;
}

export interface tpp extends TagPrevProps {
  index: number;
  sstate: Function;
}
