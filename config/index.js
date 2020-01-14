require('dotenv').config();

module.exports = {
  secretKey: process.env.SECRET_KEY,
  token: {
    key: process.env.TOKEN_KEY,
  },
  clientUrl: process.env.CLIENT_URL
};
