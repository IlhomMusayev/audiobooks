import bcrypt from "bcrypt";

module.exports.generateHash = function (password: string) {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

module.exports.compareHash = function (password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
};
