// workers/auth.js
// const expose = require("threads/worker");

const { expose } = require("threads");

expose({
  runner(fn: any) {
    return fn();
  }
});
