const multer = require("multer");

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, __basedir + process.env.FILES_PATH);
    //cb(null, __basedir + "/app/resources/static/assets/uploads/"); FOR PRODUCTION
    // THIS IS FOR DEV
    cb(null, __basedir + "/lydio-ecom-backend/resources/static/assets/uploads/");

  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-excelfile-${file.originalname}`);
    // cb(null, `${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;