const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require("path")
const fs = require('fs')
//now we also need to run the ffmpeg command in cmd
//so we use childprocess
//the right way is to use the aws shit here
const {exec}  = require("child_process")
require("dotenv").config();
const crypto = require('crypto')
const { stderr,stdout } = require('process')

const app = express()

//using multer
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+crypto.randomUUID()+path.extname(file.originalname))
    }
});

//multer configuration 
const upload = multer({storage:storage});
//enabling only specific ips to connect to my server
app.use(cors(
    {origin:['http://localhost:3000','http://localhost:5173'],credentials:true}
));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*") // watch it
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next()
//   })
//remember that the following two middleware are for the post method when you get data either in json form or the urlencoded form
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/public',express.static('public'))
app.get('/',(req,res)=>res.json({message:"things are working"}));
app.post("/upload",upload.single('file'),function (req,res){
    const lessonId = crypto.randomUUID();
    const videoPath = req.file.path;
    //now making the output path in advance 
    //this format will be followed after the file is processed 
    //but we know it ahead of time
    const outputPath = `./public/uploads/courses/${lessonId}`;
    //m3u8 file will hold the index-location pair of different segments of the video
    //whenever we need a part of the video we can just see this file and give the part the user is at
    //this is not a video but the index file for that video

    const hlsPath = `${outputPath}/index.m3u8`
    //if this file is not present already then create a dir
    console.log("i came inside the if statement",outputPath);
    if(!fs.existsSync(outputPath)){
        console.log("i came inside the if statement");
        fs.mkdirSync(outputPath,{recursive:true});
    }
    //the GREAT ffmpeg command that does everything
    const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`

    exec(ffmpegCommand,(error,stdout,stderr)=>{
        if(error){
            console.log(`exec error: ${error}`);
        }
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)

        //now we are constructing the url of the processed video 
        //this is the url that is stored in the database
        const videoUrl = `http://localhost:3000/public/uploads/courses/${lessonId}/index.m3u8`;
        res.json({
            message:"the video was converted to hls format",
            videoUrl:videoUrl,
            lessonId:lessonId,
        })

    })

    
})

app.listen(process.env.PORT,()=>
    console.log(`the things is running on port ${process.env.PORT}`)
)