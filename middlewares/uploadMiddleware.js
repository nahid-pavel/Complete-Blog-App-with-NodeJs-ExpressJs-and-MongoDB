const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb)=> {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  }
});

if(storage.getDestination){
    console.log(storage.getDestination)
}else{
    console.log('not')
}

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    const types = /jpeg|jpg|png|gif/;
    const extName = types.test(path.extname(file.originalname).toLowerCase());
    const mimeType = types.test(file.mimetype);

    if (extName && mimeType) {
      console.log('matched')
    
      cb(null, true);
    } else {
      console.log('not matched')
      cb(new Error("Only Supports Images"));
    }
  }
});

module.exports = upload
