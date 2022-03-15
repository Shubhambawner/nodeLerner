const multer = require('multer'); //* this is module required to create the file uploader


//* Returns a StorageEngine implementation configured to store files on the local file system in Hard Disk.
//* A string or function may be specified to determine the destination directory, and a function to determine filenames. 
//! If no options are set, files will be stored in the system's temporary directory with random 32 character filenames.
const storage = multer.diskStorage({
    //* destination is used to determine within which folder the uploaded files should be stored. This can also be given as a string (e.g. '/tmp/uploads'). If no destination is given, the operating system’s default directory for temporary files is used.
    destination: './uploads/',
    //* filename is used to determine what the file should be named inside the folder. If no filename is given, each file will be given a random name that doesn’t include any file extension.
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
})

//* Function to control which files are accepted and which are not.
function imgFileFilter(req, file, cb) {

    // The function should call `cb` with a boolean to indicate if the file should be accepted
    // To reject this file pass `false`, like so: cb(null, false)
    // To accept the file pass `true`, like so: cb(null, true)

    //! allow images only
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)
        && file.mimetype.match(/image\/*/)  //! mime type is important to check the file type 
    ) {
        console.log((JSON.stringify(file)));//{"fieldname":"myFile","originalname":"bhai.png","encoding":"7bit","mimetype":"image/png"}
        //! JSON.stringify(req) TypeError: Converting circular structure to JSON
        return cb(null, true);
    } else {
        cb(new Error('file type not supported'), false);
    }

    //! reject all other files
    cb(new Error('I don\'t have a clue!'), false);
    //! always return false by default. 


}

//! Specifying the limits can help protect your site against denial of service (DoS) attacks.
const sizeLimiter = {
    fieldSize: 2 * 1024 * 1024, // 2 MB (max file name size)
    fileSize: 2 * 1024 * 1024, //* 2 MB (max file size)
    parts: 2, // allow up to 1 parts per request,(fields + files)
    files: 1, // allow up to 1 files per request,
}


const imgUpload = multer(
    {
        storage: storage,
        limits: sizeLimiter,
        fileFilter: imgFileFilter
    })

module.exports = imgUpload;
