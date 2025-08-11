const bcrypt = require("bcryptjs");
const SALT = 10;

async function validPassword(enteredPassword, passwordHash) {
  return await bcrypt.compare(enteredPassword, passwordHash);
}

async function createPasswordHash(password) {
  return await bcrypt.hash(password, SALT);
}

module.exports = { validPassword, createPasswordHash };
