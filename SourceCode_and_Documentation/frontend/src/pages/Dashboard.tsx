import { LatLngTuple } from "leaflet";
import React, { useEffect, useState } from "react";
import { AppContext } from "../components/Context";
import { MapWrapper } from "../components/Map";
import { DashboardNav } from "../components/Navbar/DashboardNav";
import { Sidebar } from "../components/Sidebar";
import { TagInfo } from "../components/Interfaces";
import reefPic from "../assets/reef.jpeg";
import { searchSong } from "../components/Spotify-Api/spotifyApi";
// import { TagCreationLayer } from "../components/TagCreate/TagCreationLayer";

const tagjson: TagInfo[] = [
  {
    title: "The Ocean's Beauty",
    location: "Tasmania",
    desc: `I'm proud to be from New Zealand! My favourite Maori saying is: 
      'Ka Kite Ano', meaning "See you tomorrow". However, my number one
      favourite thing about my culture is that there is a legend for everthing. 
      Mountains? Yep. Rivers? Yep. Lakes? Yep! I hope you get a chance to visit
      my beautiful country, I guarantee you'll fall in love!`,
    imgurl: "https://ak5.picdn.net/shutterstock/videos/1014147545/thumb/1.jpg",
    coords: [-33.86785, 151.20732],
    song: {
      name: "i lived",
      album: "I Lived - One Republic",
    },
  },
  {
    title: "Memories Stay",
    location: "UNSW",
    desc: `I can't believe graduation is here... One day I'm praying to finish
      uni already and the next I can't bring myself to leave the campus. I'm
      grateful for the way my university experience has shaped me, and I'm glad
      I decided not to drop out in first year.`,
    imgurl:
      "https://www.universitiesaustralia.edu.au/wp-content/uploads/2019/05/UNSW-2020_Web-2-1333x1000.jpg",
    coords: [-43.52565, 172.639847],
    song: {
      name: "the end of the road",
      album: "The End of the Road - Boyz II Men",
    },
  },
  {
    title: "Thrill of My Life",
    location: "Luna Park",
    desc: `So many fond memories visiting Luna Park as a little boy. My mum would hug me
      every time we went on the ferris wheel because I was scared (even though it was my 
      favourite ride!!) She was so patient with me when I couldn't decide on an ice cream 
      I miss her every day.`,
    imgurl:
      "https://media-cdn.tripadvisor.com/media/photo-s/1a/70/42/90/luna-park-sydney.jpg",
    coords: [-42.87936, 147.32941],
    song: {
      name: "happy",
      album: "Happy - Pharell Williams",
    },
  },
  {
    region: "Australia",
    username: "Anonymous",
    title: "Beautiful Experience!",
    imgurl: reefPic,
    location: "Queensland",
    song: {
      name: "Water",
      artist: "Kanye West",
    },
    desc: `Being underwater is such a surreal experience, one that I
    can't compare to anything else! My favourite lyric in this
    song is "Clean us like the rain in spring... Let Your light
    reflect on me" Can't wait until I see the ocean again!!!`,
    coords: [-16.49941, 145.465908],
  },
];

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [tagIndex, setTagIndex] = useState(-1);
  const [markers, setMarkers] = useState<LatLngTuple[]>([]);
  const [createTag, setCreateTag] = useState(false);
  const [tags, setTags] = useState<TagInfo[]>([]);
  useEffect(() => {
    // fetch("/viewTags").then((data) => console.log(data));
    const mark = tagjson.map((tag) => tag.coords);
    setMarkers(mark);

    setTags(tagjson);

    // tagjson.map((tag) => {
    //   searchSong(tag?.song?.name).then((res) => {
    //     console.log(tag?.song?.name, " ", res);
    //   });
    // });
  }, []);
  return (
    <AppContext.Provider
      value={{
        open,
        setOpen,
        tagIndex,
        setTagIndex,
        markers,
        setMarkers,
        createTag,
        setCreateTag,
        tags,
        setTags,
      }}
    >
      <DashboardNav />
      <div style={{ height: "100%" }}>
        <div
          style={{
            height: "100vh",
            position: "absolute",
            zIndex: 1,
            left: 0,
            width: "100%",
            marginTop: "1%",
          }}
        >
          <MapWrapper />
        </div>
        <div
          style={{
            marginTop: "8%",
            position: "absolute",
            top: 50,
            left: 50,
            zIndex: 10,
          }}
        >
          <Sidebar />
          {/* <TagCreationLayer /> */}
        </div>
      </div>
    </AppContext.Provider>
  );
};

export { Dashboard };
