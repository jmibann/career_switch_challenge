const { rest } = require('msw');

const { ORDER_CHECK_URL } = require('../api/urls');

const TEST_TOKEN = "b93ac073-eae4-405d-b4ef-bb82e0036a1d"
const SOLVED_RIDDLE = ["f319", "46ec", "c1c7", "3720", "c7df", "c4ea", "4e3e", "80fd"];

const checkContiguityHandler = rest.post(ORDER_CHECK_URL, (req, res, ctx) => {
  const token = req.url.searchParams.get('token');
  const { blocks, encoded } = req.body;
  
  if(TEST_TOKEN !== token) {
    return res(ctx.status(400));
  }

  if ( encoded ) {
    isCorrect = SOLVED_RIDDLE.join('') === encoded;
    return res(ctx.json({ message: isCorrect }));
  }

  const [word_1, word_2] = blocks;

  indexWord_1 = SOLVED_RIDDLE.findIndex(block => block === word_1);
  indexWord_2 = SOLVED_RIDDLE.findIndex(block => block === word_2);
  const areContiguous = indexWord_2 === ( indexWord_1 + 1 );

  return res(ctx.json({ message: areContiguous }));
});

const handlers = [
  checkContiguityHandler,
 ];

module.exports = { handlers, TEST_TOKEN, SOLVED_RIDDLE }