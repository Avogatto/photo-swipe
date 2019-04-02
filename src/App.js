import React, { Component } from 'react'
import io from 'socket.io-client'
import OAuth from './OAuth'
import './App.css'

const API_URL = 'http://localhost:8080'; // TODO change for production
const socket = io(API_URL)

export default class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <OAuth socket={socket} />
      </div>
    )
  }
}
