//Fibonacci
//input 3
// 0,1,1
//
//input 5
// 0,1,1,2,3

const { createSandbox } = require("sinon");
const Fibonacci = require("./fibonacci");
const sinon = createSandbox();

const assert = require("assert");

(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    // Number of sequence: 3
    // [0] input = 3, current = 0, next = 1 -> result 0
    // [1] input = 2, current = 1, next = 1 -> result 1
    // [2] input = 1, current = 1, next = 2 -> result 1
    // [3] input = 0 -> Stop
    {
      for (const sequence of fibonacci.execute(3)) {
      }
      const expectedCallCount = 4;
      assert.strictEqual(spy.callCount, expectedCallCount);
    }
  }

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    // Number of sequence: 5
    // [0] input = 5, current = 0, next = 1 -> result 0
    // [1] input = 4, current = 1, next = 1 -> result 1
    // [2] input = 3, current = 1, next = 2 -> result 1
    // [3] input = 2, current = 2, next = 3 -> result 2
    // [4] input = 1, current = 3, next = 5 -> result 3
    // [5] input = 0 -> Stop
    {
      const results = [...fibonacci.execute(5)];

      const expectedCallCount = 6;
      assert.strictEqual(spy.callCount, expectedCallCount);

      const { args } = spy.getCall(2);
      const expectedParams = [3, 1, 2];
      assert.deepStrictEqual(
        args,
        expectedParams,
        "Those arrays are not the same"
      );

      const expectedResults = [0, 1, 1, 2, 3];
      assert.deepStrictEqual(
        results,
        expectedResults,
        "Those arrays are not the same"
      );
    }
  }
})();
