import React from 'react'


function VideoUpload(){
    return (
        <>
            <div className='h-2/3 w-1/2  flex flex-col items-center space-y-3 justify-center rounded-md p-6'>
                <h1 className='text-gray-50'>Upload your file to s3</h1>
                <form className='min-w-full'>
                <label for="uploadFile1"
                    class=" text-gray-500 font-semibold text-base rounded max-w-md min-w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                        <path
                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                        data-original="#000000" />
                        <path
                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                        data-original="#000000" />
                    </svg>
                    Upload file

                    <input type="file" id='uploadFile1' class="hidden" accept="video/*"/>
                    <p class="text-xs font-medium text-gray-400 mt-2">Videos are allowed</p>
                </label>
                </form>
                <button className='bg-green-700 p-2 rounded-md text-white'>Upload</button>
            </div>
        </>
    )
}
export default VideoUpload;