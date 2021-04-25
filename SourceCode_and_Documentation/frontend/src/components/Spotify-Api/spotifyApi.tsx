const redirect_uri = "http://localhost:3000/register/success";

// To move this to the backend before release
const client_id = "aad2301edd774feba0ad6a82822c64dc";
const client_secret = "fb32e1d4171c42ce8e09af2b09c5e876";

let access_token = localStorage.getItem("access_token");
let refresh_token = localStorage.getItem("refresh_token");

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";
const CURRENTLYPLAYING =
  "https://api.spotify.com/v1/me/player/currently-playing";
const SEARCH = "https://api.spotify.com/v1/search";

// Get items from localstorage
const onPageLoad = () => {
  if (window.location.search.length > 0) {
    handleRedirect();
  }
};

// Get authorization URL
const requestAuthorization = () => {
  localStorage.setItem("client_id", client_id);
  localStorage.setItem("client_secret", client_secret);

  let url = AUTHORIZE;
  url += "?client_id=" + client_id;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirect_uri);
  url += "&show_dialog=true";
  url +=
    "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
  return url; // Show Spotify's authorization screen
};

// Handle redirect from spotify login, get access/refresh tokens
const handleRedirect = () => {
  let code = getCode();
  fetchAccessToken(code);

  // remove param from url
  window.history.pushState("", "", redirect_uri);
};

// Get code from url
const getCode = () => {
  const queryString = window.location.search;
  if (queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("code") || "";
  }
  return "";
};

const fetchAccessToken = (code: string) => {
  let body = "grant_type=authorization_code";
  body += "&code=" + code;
  body += "&redirect_uri=" + encodeURI(redirect_uri);
  body += "&client_id=" + client_id;
  body += "&client_secret=" + client_secret;
  callAuthorizationApi(body);
};

const callAuthorizationApi = async (body: string) => {
  const response = await fetch(TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(client_id + ":" + client_secret),
    },
    body,
  });
  if (response.status === 200) {
    const data = await response.json();
    if (data.access_token) {
      access_token = data.access_token as string;
      localStorage.setItem("access_token", access_token);
    }
    if (data.refresh_token) {
      refresh_token = data.refresh_token as string;
      localStorage.setItem("refresh_token", refresh_token);
    }
    onPageLoad();
  }
};

const currentlyPlaying = async () => {
  callApi("GET", CURRENTLYPLAYING, null);
};

const searchSong = async (songName: string) => {
  const songUrl = await callApi(
    "GET",
    `${SEARCH}?q=${songName}&type=track`,
    null
  );
  return songUrl?.tracks?.items?.[0]?.uri || "";
};

const callApi = async (method: string, url: string, body: any) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    body,
  });
  const data = await response.json();
  return data;
};

export { requestAuthorization, handleRedirect, currentlyPlaying, searchSong };
