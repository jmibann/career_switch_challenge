const EMAIL = process.env.EMAIL;

const TOKEN_URL = `https://rooftop-career-switch.herokuapp.com/token?email=${EMAIL}`;
const BLOCK_URL = "https://rooftop-career-switch.herokuapp.com/blocks"
const ORDER_CHECK_URL = "https://rooftop-career-switch.herokuapp.com/check"
const VERIFY_RIDDLE = "https://rooftop-career-switch.herokuapp.com/check"

module.exports = {
  TOKEN_URL,
  BLOCK_URL,
  ORDER_CHECK_URL,
  VERIFY_RIDDLE
};