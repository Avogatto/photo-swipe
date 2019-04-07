import React, { Component } from 'react'
import io from 'socket.io-client'
import OAuth from './OAuth'
import './App.css'

const API_URL = 'http://localhost:8080'; // TODO change for production
const socket = io(API_URL)

async function getAlbums() {
  try {
    const response = await fetch(`${API_URL}/albums`, { credentials: 'include' });
    const result = await response.json();
    console.log('result???', result);
  } catch (err) {
    console.error(err.toString());
  }
}

export default class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <OAuth socket={socket} />
        <button onClick={getAlbums}>Get Albums</button>
      </div>
    )
  }
}
