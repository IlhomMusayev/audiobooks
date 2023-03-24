const { verify, sign } = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_WORD";

export function genereteToken(data: any) {
  return sign(data, JWT_SECRET, {
    expiresIn: 36000,
  });
}

export function checkToken(data: any) {
  try {
    return verify(data, JWT_SECRET);
  } catch (e) {
    return false;
  }
}
