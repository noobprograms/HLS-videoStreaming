const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require("path")
require("dotenv").config();
const crypto = require('crypto')

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
    {origin:['http://localhost:3000'],credentials:true}
));
//remember that the following two middleware are for the post method when you get data either in json form or the urlencoded form
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads',express.static('/public/uploads'))
app.get('/',(req,res)=>res.json({message:"things are working"}));
app.post("/upload",upload.single('file'),function (req,res){

    res.json({
        message:"the message was uploaded"
    })
})

app.listen(process.env.PORT,()=>
    console.log(`the things is running on port ${process.env.PORT}`)
)