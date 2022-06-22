const check = require('./src/check');
const { verifyAnswer } = require('./src/api');

const { TEST_TOKEN, SOLVED_RIDDLE } = require('./src/mocks/handlers');

describe("Test verification endpoint", () => {
  test("Verifies correct answer ", async () => {
    const verification = await verifyAnswer(TEST_TOKEN, SOLVED_RIDDLE.join(''));
    expect(verification.message).toBe(true);
  });

  test("Verifies incorrect answer ", async () => {
    const verification = await verifyAnswer(
      TEST_TOKEN,
      ["f319", "3720", "4e3e", "c7df","46ec", "c1c7", "c4ea", "80fd"].join('')
    );
    
    expect(verification.message).toBe(false);
  });

  test("Verifies incorrect answer - Different array size ", async () => {
    const verification = await verifyAnswer(
      TEST_TOKEN,
      ["f319", "3720"].join('')
    );
    
    expect(verification.message).toBe(false);
  });
});

describe("Test check function", () => { 

  test("Test happy path case ", async () => {
    const solution = await check(SOLVED_RIDDLE, TEST_TOKEN);

    const verification = await verifyAnswer(TEST_TOKEN, solution.join(''));
    expect(verification.message).toBe(true);
  });

  test("Test disordered case ", async () => {
    const solution = await check(
      ["f319", "3720", "4e3e", "80fd", "c7df","46ec", "c1c7", "c4ea"],
      TEST_TOKEN
    );

    const verification = await verifyAnswer(TEST_TOKEN, solution.join(''));
    expect(verification.message).toBe(true);
  });

  test("Test incorrect check answer - Different array size (shorter)", async () => {
    const solution = await check(
      ["f319", "3720", "4e3e"],
      TEST_TOKEN
    );

    const verification = await verifyAnswer(TEST_TOKEN, solution.join(''));
    expect(verification.message).toBe(false);
  });

  test("Test incorrect check answer - Different array size (larger)", async () => {
    const solution = await check(
      [...SOLVED_RIDDLE, "f319", "3720", "4e3e"],
      TEST_TOKEN
    );

    const verification = await verifyAnswer(TEST_TOKEN, solution.join(''));
    expect(verification.message).toBe(false);
  });
})