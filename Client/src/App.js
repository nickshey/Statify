import React, { Component } from 'react';
import './App.css';
import spotify from './login.svg';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      artistDetails: {artists: {items: []}},
      trackDetails: {tracks: {items: []}},
      auth: token
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
        
      })
  }

  getShortTerm(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://api.spotify.com/v1/me/top/artists?time_range=short_term", false);
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", "Bearer " + this.state.auth); // true for asynchronous 
    xmlHttp.send(null);
    var data = JSON.parse(xmlHttp.responseText);
    if(xmlHttp.response > 400)
      alert("please log in")
    this.setState({
      artistDetails: {artists: data}
    })
    xmlHttp.open("GET", "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50", false);
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", "Bearer " + this.state.auth); // true for asynchronous 
    xmlHttp.send(null);
    if(xmlHttp.response > 400)
      alert("please log in")
    var data = JSON.parse(xmlHttp.responseText);
    this.setState({
      trackDetails: {tracks: data}
    })
  }
  getMediumTerm(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50", false);
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", "Bearer " + this.state.auth); // true for asynchronous 
    xmlHttp.send(null);
    var data = JSON.parse(xmlHttp.responseText);
    if(xmlHttp.response > 400)
      alert("please log in")
    this.setState({
      artistDetails: {artists: data}
    })
    xmlHttp.open("GET", "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50", false);
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", "Bearer " + this.state.auth); // true for asynchronous 
    xmlHttp.send(null);
    if(xmlHttp.response > 400)
      alert("please log in")
    var data = JSON.parse(xmlHttp.responseText);
    this.setState({
      trackDetails: {tracks: data}
    })
  }
  getLongTerm(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50", false);
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", "Bearer " + this.state.auth); // true for asynchronous 
    xmlHttp.send(null);
    if(xmlHttp.response > 400)
      alert("please log in")
    var data = JSON.parse(xmlHttp.responseText);
    this.setState({
      artistDetails: {artists: data}
    })
    xmlHttp.open("GET", "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50", false);
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", "Bearer " + this.state.auth); // true for asynchronous 
    xmlHttp.send(null);
    if(xmlHttp.response > 400)
      alert("please log in")
    var data = JSON.parse(xmlHttp.responseText);
    this.setState({
      trackDetails: {tracks: data}
    })
    console.log(data)
  }

  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888'> <img src={spotify} style={{ height: 35 }}  /> </a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
        <br />
        <button onClick={() => this.getShortTerm()}>
            Show Short Term
        </button>

        <button onClick={() => this.getMediumTerm()}>
            Show Medium Term
        </button>

        <button onClick={() => this.getLongTerm()}>
            Show Long Term
        </button>
        <br />
        <div class="left-half">
        <h1> Artists </h1>
        {this.state.artistDetails.artists.items.map(artist => (
          <div>
              <img src={artist.images[0].url} style={{ height: 150 }}/> <br/>
              <a href={artist.uri}> {artist.name} </a>
              <p style={{ color:'white'}}> empty lol</p>
          </div>
        ))}
        </div>
        <div class="right-half">
        <h1> Tracks </h1>
        {this.state.trackDetails.tracks.items.map(track => (
          <div>
            <img src={track.album.images[0].url} style={{height:150}} ></img> <br />
              <a href={track.uri}> {track.name} </a>
              <p> {track.artists[0].name} </p>
          </div>
        ))}
        </div>
      </div>
    );
  }
}

export default App;