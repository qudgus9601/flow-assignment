const { AWS } = require("../utils/aws");

module.exports = {
  upload: async (req, res, next) => {
    try {
      if (!!req.file) {
        res.status(200).json({
          message: "파일 업로드 완료",
          fileInfo: { name: req.file.originalname },
        });
      } else {
        res.json({
          message: "파일 업로드 실패",
        });
      }
    } catch (error) {}
  },
};
