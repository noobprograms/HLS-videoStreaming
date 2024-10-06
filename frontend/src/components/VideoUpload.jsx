import React, { useState } from 'react';
import axios from 'axios';





 async function getPresignedUrl(file) {
    try {
      

    
        console.log(file)
      const result = await axios.get(`${import.meta.env.LAMBDA_URL}?Key=${file.name}&Type=${file.type}`,{headers:{"Content-Type": file.type,}});
      console.log(result.data.message)
      if (result.data.status === "Success") {
        
        return result.data.message;
        
      } else {
        throw new Error(`Failed to obtain presigned URL. Status: ${result.data.status}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }






function VideoUpload(){
    const [selectedFile,setSelectedFile] = useState(null);
    const [progress,setProgress] = useState(0);
    const [uploading,setUploading] = useState(false);
    const [message,setMessage] = useState("");
    var selectedFileName = "";
    function handleFileChange(event){
        console.log(event.target.files[0]);
        if(event.target.files){
            setSelectedFile(event.target.files[0]);
        }
        
    }
    
    const renderAttachedFilePreview = () => {
        return <div>{selectedFile?.name}</div>;
      };
    async function uploadToS3(){
        const uploadUrl =await getPresignedUrl(selectedFile);
        try {
            const form = new FormData();
            form.append('file', selectedFile);
            const response = await axios.put(uploadUrl, selectedFile,{
                headers: {
                  'Content-Type': selectedFile.type ?? 'multipart/form-data',
                },
                
              })
          } catch (error) {
            console.error('Error Uploading file to s3:', error);
          }
    }
    return (
        <>
            <div className='h-2/3 w-1/2  flex flex-col items-center space-y-3 justify-center rounded-md p-6'>
                <h1 className='text-gray-50'>Upload your file to s3</h1>
                <form className='min-w-full flex flex-col items-center' >
                <label htmlFor="uploadFile1"
                    className=" text-gray-500 font-semibold text-base rounded max-w-md min-w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                        <path
                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                        data-original="#000000" />
                        <path
                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                        data-original="#000000" />
                    </svg>
                    Upload file
                    {selectedFile && renderAttachedFilePreview()}

                    <input type="file" id='uploadFile1' className="hidden" accept="video/*" onChange={handleFileChange}/>
                    <p className="text-xs font-medium text-gray-400 mt-2">Videos are allowed </p>

                </label>

                </form>
                <button disabled={!selectedFile} type="submit" className='bg-green-700 p-2 w-20 mt-7  rounded-md text-white' onClick = {uploadToS3}>Upload</button>

            </div>
        </>
    )
}

export default VideoUpload;