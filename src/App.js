import React, { Component } from 'react'
import io from 'socket.io-client'
import OAuth from './OAuth'
import './App.css'

const { REACT_APP_API_BASE: API_BASE } = process.env;
const socket = io(API_BASE)

async function getAlbums() {
  try {
    const response = await fetch(`${API_BASE}/albums`, { credentials: 'include' });
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
