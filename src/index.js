const api = require('./api/index.js');
const check = require('./check.js');
const TOKEN = require('./api/token.js');

api.getBlocks()
  .then(res => res.data)
  .then(blocks => check(blocks, TOKEN))
  .then(answer => console.log('====> answer: ', answer))


