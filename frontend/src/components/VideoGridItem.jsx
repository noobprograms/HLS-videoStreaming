import React from 'react';

function VideoGridItem(props){
    // props have the following values in them
    //props.title
    //props.channelName
    //props.id
    //props.views
    //props.postedAt (Date)
    //props.thumbnailURL
    //props.duration
    //props.videoURL
    return (
    
    <>
        <div className='flex flex-col gap-2'>
            <a href={'watch?v=${props.id}'} className='relative aspect-video'>
                <img src={props.thumbnailURL} className='block w-full h-full object-cover rounded-xl' />
                <div className='absolute bottom-1 right-1 bg-black text-white text-sm px-5 rounded'>
                {props.duration}
            </div>
            </a>
            

        </div>
    </>
    );
}
export default VideoGridItem;