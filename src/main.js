const core = require('@actions/core');

function main() {
  const outcome = core.getInput('outcome', { required: true });
  let status;
  if (outcome && outcome === 'success') {
    status = 'success';
  } else {
    status = 'failure';
  }
  core.setOutput('status', status);
}

main();
