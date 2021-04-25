import { LatLngTuple } from "leaflet";
import React, { useEffect, useState } from "react";
import { AppContext } from "../components/Context";
import { MapWrapper } from "../components/Map";
import { DashboardNav } from "../components/Navbar/DashboardNav";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { BackendTag, TagInfo } from "../components/Interfaces";
import reefPic from "../assets/reef.jpeg";
import { searchSong } from "../components/Spotify-Api/spotifyApi";
import { useHistory } from "react-router-dom";
import { api } from "../helpers/api";
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
    coords: [-43.52565, 172.639847],
    song: {
      name: "i lived",
      album: "I Lived - One Republic",
      uri: "spotify:track:3IQF4xCQUPicbA4hWfTxPo",
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

    coords: [-33.86785, 151.20732],
    song: {
      name: "the end of the road",
      album: "The End of the Road - Boyz II Men",
      uri: "spotify:track:794U3ttupMPMfgZo0CT6NF",
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
      uri: "spotify:track:60nZcImufyMA1MKQY3dcCH",
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

const randImages = [
  "https://images.unsplash.com/photo-1617206685118-9cfb15f14502?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
  "https://images.unsplash.com/photo-1616793957360-e2736dffebbe?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
  "https://images.unsplash.com/photo-1616442590959-bdb89b230371?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
  "https://images.unsplash.com/photo-1617824496324-37ca560972d8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
  "https://images.unsplash.com/photo-1616266731149-a14dfe330c81?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
  "https://images.unsplash.com/photo-1617054192912-a865f7dff87a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
  "https://images.unsplash.com/photo-1618191635333-7a6dfce0f9fb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
  "https://images.unsplash.com/photo-1617214922084-5db8d3c3df5a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
  "https://images.unsplash.com/photo-1617440168943-92f66e14cd6c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
];

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [tagIndex, setTagIndex] = useState(-1);
  const [markers, setMarkers] = useState<LatLngTuple[]>([]);
  const [createTag, setCreateTag] = useState(false);
  const [tags, setTags] = useState<TagInfo[]>(tagjson);

  const history = useHistory();

  const checkLoggedIn = () => {
    const isLoggedIn = localStorage.getItem("username");
    if (!isLoggedIn) {
      history.push("/");
    }
  };

  useEffect(() => {
    console.log(tags);
    checkLoggedIn();
    fetch(`${api}viewTags`)
      .then((res) => res.json())
      .then((data) => {
        const updated: TagInfo[] = data["tag list"]
          .map((tagInfo: BackendTag, index: number) => {
            const {
              region,
              username,
              image,
              title,
              location,
              song_uri,
              caption,
            } = tagInfo;
            const cod = location.split(" ").map((l) => Number(l));
            console.log(image);
            // fetch(`${api}image?p=${image.path}`).then((res) =>
            //   console.log(res)
            // );
            if (!cod || isNaN(cod[0]) || isNaN(cod?.[1])) {
              return null;
            }
            const tInf: TagInfo = {
              region,
              username,
              title,
              imgurl:
                index < randImages.length
                  ? randImages[index]
                  : "https://source.unsplash.com/random",
              song: { uri: song_uri },
              desc: caption,
              coords: [cod[0], cod[1]],
            };
            return tInf;
          })
          .filter((ele: TagInfo | null) => ele);

        const mark = updated.map((tag) => tag.coords);
        mark.push(...tagjson.map((e) => e.coords));
        setMarkers(mark);

        setTags([...updated, ...tagjson]);
      });
    // const mark = tagjson.map((tag) => tag.coords);
    // setMarkers(mark);

    // setTags(tagjson);

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
