const axios = require('axios');

const TOKEN = require('./token');

const EMAIL = "jmiban@gmail.com";
const TOKEN_URL = `https://rooftop-career-switch.herokuapp.com/token?email=${EMAIL}`;
const BLOCK_URL = "https://rooftop-career-switch.herokuapp.com/blocks?token="
const ORDER_CHECK_URL = "https://rooftop-career-switch.herokuapp.com/check?token="
const VERIFY_RIDDLE = "https://rooftop-career-switch.herokuapp.com/check?token="

const getToken = () => 
  axios.get(TOKEN_URL)
    .then(res => res.data )
    .catch(error => console.error('==> ERROR GETTING TOKEN <==', error));

const getBlocks = () => axios.get(`${BLOCK_URL}${TOKEN}`)
  .then(res => res.data)
  .catch(error => console.log('==> ERROR GETTING BLOCKS <==', error))

const checkIfContigous = (token, word_1, word_2) =>
  axios.post(`${ORDER_CHECK_URL}${token}`, {blocks: [word_1, word_2]})
    .then(res => res.data)
    .catch(error => console.log('==> ERROR CHECKING RIDDLE <==', error ))

const verifyAnswer = (token, answer) => 
  axios.post(`${VERIFY_RIDDLE}${token}`, {encoded: answer})
    .then(res => res.data)
    .catch(error => console.log('==> ERROR VERIFYNG RIDDLE <==', error ))

module.exports = { getToken, getBlocks, checkIfContigous, verifyAnswer };