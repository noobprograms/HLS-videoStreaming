import React from 'react'
import VideoGridItem from './VideoGridItem';
import videos from '../data/dummy'
function VideoGrid(){
    return (
        <>
            
            <h1 className='text-white text-b-'>Your Videos</h1>
            
                
                <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] w-full px-20'>
                    {videos.map((vid)=>(<VideoGridItem key={vid.id} title={vid.title} thumbnailURL = {vid.thumbnailUrl} duration = {vid.duration}/>))}
                    
                </div>
            
        </>
    );
}
export default VideoGrid;