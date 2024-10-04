import { useState } from 'react'


import VideoJs from './VideoPlayer'
import React from 'react'
import  {useRef} from 'react'
import VideoUpload from './components/VideoUpload'
import VideoGrid from './components/VideoGrid'
function App() {
  const playerRef = useRef(null)
  const videoLink = "http://localhost:3000/public/uploads/courses/b5e1b1ee-2e36-4928-8875-a372e547cc52/index.m3u8"
  const videoPlayerOptions = {
    conntrols:true,
    responsive:true,
    fluid:true,
    sources:[
      {
        src:videoLink,
        type:"application/x-mpegURL"
      }
    ]

  }
  const handlePlayerReady = (player)=>{
    playerRef.current = player;
    player.on("waiting",()=>{
      videojs.log("player is waiting");

    });
    player.on("dispose",()=>{
      videojs.log("player will dispose")
    })

  };

  return (
    <>
      
      <div className='flex flex-col justify-center items-center space-y-9 py-9 min-w-max'>
      <h1 className="text-green-700 text-4xl">My Video Streaming Application</h1>
      {/* <VideoJs
        options = {videoPlayerOptions}
        onReady = {handlePlayerReady}

      /> */}
      <VideoUpload/>
      <VideoGrid/>
      </div>
      
      
      
    </>
  )
}

export default App
