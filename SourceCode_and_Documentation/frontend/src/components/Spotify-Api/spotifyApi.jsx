// import React from 'react';

const redirect_uri = "http://localhost:3000/register/success";

const client_id = "aad2301edd774feba0ad6a82822c64dc"; 
const client_secret = "fb32e1d4171c42ce8e09af2b09c5e876"; // In a real app you should not expose your client_secret to the user

let access_token = localStorage.getItem('access_token');
let refresh_token = localStorage.getItem('refresh_token');

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing"

// Get items from localstorage
function onPageLoad(){
    // client_id = localStorage.getItem("client_id");
    // client_secret = localStorage.getItem("client_secret");
    // console.log(client_id);
    if ( window.location.search.length > 0 ){
        handleRedirect();
    }
}

// Get authorization URL
function requestAuthorization(){
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret);

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    return url; // Show Spotify's authorization screen
}

// Handle redirect from spotify login, get access/refresh tokens
function handleRedirect(){
    let code = getCode();
    console.log('CODE', code);
    fetchAccessToken( code );

    // remove param from url
    window.history.pushState("", "", redirect_uri);
}

// Get code from url
function getCode(){
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

const callAuthorizationApi = async (body) => {
    console.log(body);
    const response = await fetch(TOKEN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(client_id + ":" + client_secret)
        },
        body: body
    })
    console.log(response);
    if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        if ( data.access_token !== undefined ){
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token !== undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    } else {
        console.log(response.error);
    }
}

function currentlyPlaying(){    
    callApi( "GET", CURRENTLYPLAYING, null );
}

const callApi = async (method, url, body) => {
    console.log('here', access_token);
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + access_token
        },
        body: body
    });
    const data = await response.json();
    console.log(data);
}


export {requestAuthorization, handleRedirect, currentlyPlaying}