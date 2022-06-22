require('dotenv').config();

const api = require('./api/index.js');
const check = require('./check.js');
const TOKEN = process.env.TOKEN;

const formatRiddleToVerify = (array) => array.join('');

api.getBlocks(TOKEN)
  .then(res => res.data)
  .then(blocks => check(blocks, TOKEN))
  .then(solution => api.verifyAnswer(TOKEN, formatRiddleToVerify(solution)))
  .then(result => console.log('==> Solution verification: ', result))


