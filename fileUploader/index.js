const express = require("express")
const bodyParser = require("body-parser")
const path = require('path')
const imgUpload = require('./fileUploader')

const app = express()
app.use(bodyParser.json())
//* now all the files in 'public' will be using relative path from __dirname to access other files, otherwise which would localhost:3000
app.use('/', express.static(path.resolve(__dirname, 'public')))


//* .single('myFile') is used to upload a single file, returns the function that will be used as middleware
//! thia middlewarw will automatically select input with field named 'myFile' from formData object passed by frontend 
app.post('/upload', imgUpload.single('myFile') , (req, res, err) => {

    //* req.file is object attached to req by single() middleware.
    console.log(JSON.stringify(req.file))
    let uploadStatus = (req.file) ? 'File Uploaded Successfully' : 'File Upload Failed';
    res.json({ "status": uploadStatus, "filename": req.file.originalname, "originalname": req.file.originalname, "size": req.file.size, "type": req.file.type });
});


const HOST = 'localhost'
const PORT = 3000
app.listen(PORT, HOST, () => {
    console.log(`server started at port ${PORT} and host ${HOST}`)
})