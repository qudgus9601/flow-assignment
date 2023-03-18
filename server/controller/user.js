const User = require("../models/user");
const Format = require("../models/format");
const FormatCount = require("../models/format_count");
const crypto = require("crypto");
const encrypt = require("../utils/encrypt");

/**
 * @desc 아이디의 존재 여부를 파악합니다.
 * @param {string} id
 * @returns {bool} 존재 여부 반환
 */
const existId = async (id) => {
  // 아이디가 존재하는 아이디인지 확인합니다.
  try {
    const findUser = await User.findOne({ where: { id: id }, raw: true });
    return findUser ? true : false;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  /**
   * @desc : 회원가입을 진행합니다.
   * @param {string} id 가입 할 아이디
   * @param {string} password 가입 할 패스워드
   */
  signup: async (req, res, next) => {
    // 아이디의 존재여부를 파악합니다.
    // 아이디는 Plain을
    // 비밀번호는 암호화 하여 저장합니다.
    try {
      const ass = User.associations;
      console.log(ass);

      const user = { ...req.body };
      // 존재여부 확인 후 진행
      const isExist = await existId(user.id);
      if (isExist) {
        res.status(200).json({ message: "이미 존재하는 아이디입니다." });
      } else {
        const hashedPassword = await encrypt.hashingPassword(user.password);
        const newUser = await User.create(
          {
            id: user.id,
            password: hashedPassword,
          },
          { raw: true }
        );
        if (newUser) {
          const { password, ...rest } = newUser;
          res.status(200).json({ message: "회원가입 성공", userInfo: rest });
        }
      }
    } catch (error) {}
  },
  /**
   * @desc : 로그인을 진행합니다.
   * @param {string} id 사용자 아이디
   * @param {string} password 사용자 패스워드
   */
  signin: async (req, res, next) => {
    try {
      const user = {
        ...req.body,
      };
      const findUser = await User.findOne({
        where: { id: user.id },
        raw: true,
      });

      const alrightPassword = await encrypt.verifyPassword(
        req.body.password,
        findUser.password
      );

      if (alrightPassword) {
        const { password, ...rest } = findUser;
        res.status(200).json({ message: "로그인 성공!!", userInfo: rest });
      } else {
        res.status(200).json({ message: "비밀번호를 틀렸습니다." });
      }
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * @desc : 로그아웃을 진행합니다.
   */
  signout: (req, res, next) => {
    // 클라이언트의 쿠키를 삭제합니다.
  },
};
