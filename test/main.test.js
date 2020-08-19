/* eslint-disable global-require */
const { EOL } = require('os');
const test = require('ava');
const sinon = require('sinon');

function assertOutput(expectation, t) {
  t.truthy(process.stdout.write.called);
  t.truthy(process.stdout.write.calledWith(expectation));
}

test.before((t) => {
  // eslint-disable-next-line no-param-reassign
  t.context = {
    outcomes: {
      success: 'success',
      failure: 'failure',
      skipped: 'skipped',
      cancelled: 'cancelled',
      error: 'error',
      null: null,
      undefined,
    },
  };
});

test.beforeEach(() => {
  sinon.stub(process.stdout, 'write');
  // process.stdout.write() = sinon.stub();
});

test.afterEach(() => {
  if ('INPUT_OUTCOME' in process.env) {
    delete process.env.INPUT_OUTCOME;
  }
  sinon.restore();
  delete require.cache[require.resolve('../src/main')];
});

test.serial('success outcome returns success status', (t) => {
  process.env.INPUT_OUTCOME = t.context.outcomes.success;
  require('../src/main');
  assertOutput(`::set-output name=status::success${EOL}`, t);
});

test.serial('failure outcome returns failure status', (t) => {
  process.env.INPUT_OUTCOME = t.context.outcomes.failure;
  require('../src/main');
  assertOutput(`::set-output name=status::failure${EOL}`, t);
});

test.serial('skipped outcome returns failure status', (t) => {
  process.env.INPUT_OUTCOME = t.context.outcomes.skipped;
  require('../src/main');
  assertOutput(`::set-output name=status::failure${EOL}`, t);
});

test.serial('cancelled outcome returns failure status', (t) => {
  process.env.INPUT_OUTCOME = t.context.outcomes.cancelled;
  require('../src/main');
  assertOutput(`::set-output name=status::failure${EOL}`, t);
});

test.serial('error outcome returns failure status', (t) => {
  process.env.INPUT_OUTCOME = t.context.outcomes.error;
  require('../src/main');
  assertOutput(`::set-output name=status::failure${EOL}`, t);
});

test.serial('null outcome returns failure status', (t) => {
  process.env.INPUT_OUTCOME = t.context.outcomes.null;
  require('../src/main');
  assertOutput(`::set-output name=status::failure${EOL}`, t);
});

test.serial('undefined outcome returns failure status', (t) => {
  process.env.INPUT_OUTCOME = t.context.outcomes.undefined;
  require('../src/main');
  assertOutput(`::set-output name=status::failure${EOL}`, t);
});
