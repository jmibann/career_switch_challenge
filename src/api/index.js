const axios = require('axios');

const {
  TOKEN_URL,
  BLOCK_URL,
  ORDER_CHECK_URL,
  VERIFY_RIDDLE
} = require('./urls');

const getToken = () => 
  axios.get(TOKEN_URL)
    .then(res => res.data )
    .catch(error => console.error('==> ERROR GETTING TOKEN <==', error));

const getBlocks = (token) => axios.get(`${BLOCK_URL}?token=${token}`)
  .then(res => res.data)
  .catch(error => console.log('==> ERROR GETTING BLOCKS <==', error))

const checkIfContigous = (token, word_1, word_2) =>
  axios.post(`${ORDER_CHECK_URL}?token=${token}`, {blocks: [word_1, word_2]})
    .then(res => res.data)
    .catch(error => console.log('==> ERROR CHECKING RIDDLE <==', error ))

const verifyAnswer = (token, answer) => 
  axios.post(`${VERIFY_RIDDLE}?token=${token}`, {encoded: answer})
    .then(res => res.data)
    .catch(error => console.log('==> ERROR VERIFYNG RIDDLE <==', error ))

module.exports = { getToken, getBlocks, checkIfContigous, verifyAnswer };