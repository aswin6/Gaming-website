require('dotenv').config();
module.exports = {
  SERVER_PORT: process.env.PORT || 8887,
  SERVER_DB_URI: process.env.DB_URI,
  JWT_SECRET: 'thisIsASimpleTest',
  OTP_LENGTH: 10,
  OTP_CONFIG: {
    upperCaseAlphabets: false,
    specialChars: false,
  },
  MAIL_SETTINGS: {
    service: 'gmail',
    auth: {
      user: 'ictakKerala20k',
      pass: 'ICTKerala@2021',
    },
  },
};