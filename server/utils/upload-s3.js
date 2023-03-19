const { AWS, awsConfig } = require("./aws");
const multer = require("multer");
const multerS3 = require("multer-s3");

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

awsConfig();

const s3 = new AWS.S3();

const uploadToS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `uploads/${decodeURI(file.originalname)}`);
    },
  }),
  limits: {
    // 10 MB
    fileSize: 1000 * 1000 * 10,
  },
});

module.exports = uploadToS3;
