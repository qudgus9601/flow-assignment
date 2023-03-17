module.exports = {
  /**
   * @desc : 회원가입을 진행합니다.
   * @param {string} id 가입 할 아이디
   * @param {string} password 가입 할 패스워드
   */
  signup: (req, res, next) => {
    // 아이디는 Plain을
    // 비밀번호는 암호화 하여 저장합니다.
  },
  /**
   * @desc : 로그인을 진행합니다.
   * @param {string} id 사용자 아이디
   * @param {string} password 사용자 패스워드
   */
  signin: (req, res, next) => {
    // 아이디를 Plain으로 받아옵니다.
    // 비밀번호를 암호화하여 DB와 비교합니다.
  },
  /**
   * @desc : 로그아웃을 진행합니다.
   */
  signout: (req, res, next) => {
    // 클라이언트의 쿠키를 삭제합니다.
  },
};
