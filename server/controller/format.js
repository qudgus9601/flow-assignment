const Format = require("../models/format");
const { sequelize } = require("../utils/db");

// FIX : 포멧 추가할 때 있는 값인지 검증하고 넣기

module.exports = {
  /**
   * @desc 모든 포멧 리스트를 받아옵니다.
   */
  list: async (req, res, next) => {
    try {
      const list = await Format.findAll({
        raw: true,
      });
      res.status(200).json({
        message: "모든 포멧 리스트입니다.",
        formatList: list,
      });
    } catch (error) {}
  },
  /**
   * @desc 새로운 커스텀 포멧을 추가합니다.
   * @param {string} name 등록할 포멧 이름
   */
  add: async (req, res, next) => {
    try {
      const newFormat = await Format.create({ name: req.body.name });
      res.status(200).json({
        message: "포멧 등록 완료",
        formatInfo: newFormat,
      });
    } catch (error) {}
  },
  /**
   * @desc 특정 커스텀 포멧을 삭제합니다.
   * @param {string} name 삭제할 포멧 이름
   */
  remove: async (req, res, next) => {
    try {
      const deletedFormat = await Format.destroy({
        where: {
          name: req.body.name,
        },
      });
      res
        .status(200)
        .json({ message: "포멧 삭제 성공", success: !!deletedFormat });
    } catch (error) {}
  },
  /**
   * @desc 포멧의 Deprecated 값을 업데이트 합니다.
   * @param {*} req
   */
  deprecate: async (req, res, next) => {
    try {
      const updatedFormat = await Format.update(
        { deprecated: !req.body.deprecated },
        { where: { name: req.body.name } }
      );
      res
        .status(200)
        .json({ message: "포멧 제한 변경", success: !!updatedFormat });
    } catch (error) {}
  },
  // 시간 되면 커스텀 포멧을 정적 포멧으로 변경할 수 있는 기능 등록하자
};
