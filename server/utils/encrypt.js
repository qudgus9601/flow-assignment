const crypto = require("node:crypto");

module.exports = {
  /**
   * @param {string} password
   * @returns {string} 솔트 값과 비밀번호를 합친 문자열을 반환합니다.
   */
  hashingPassword: async (password) => {
    // 사용자마다 고유의 솔트값을 갖습니다.
    const salt = crypto.randomBytes(16).toString("hex");
    return new Promise((res, rej) => {
      // 암호화를 진행합니다.
      crypto.scrypt(password, salt, 64, (err, hashedPassword) => {
        return res(`${salt}:${hashedPassword.toString("base64")}`);
      });
    });
  },
  verifyPassword: async (password, storedPassword) => {
    // 사용자의 비밀번호에서 암호화된 비밀번호와 솔트값을 가지고옵니다.
    const [salt, comparedPassword] = storedPassword.split(":");
    return new Promise((res, rej) => {
      // 암호화를 진행합니다.
      crypto.scrypt(password, salt, 64, (err, hashedPassword) => {
        return res(comparedPassword === hashedPassword.toString("base64"));
      });
    });
  },
};
