#!/usr/bin/env node

const { OarmSimulator } = require('./index');

const args = process.argv.slice(2);

if (args[0] === 'run') {
  const configFile = args[1];
  const stealthAppIp = args[2];
  const sendImage = args[3] === 'true';

  const simulator = new OarmSimulator(configFile, stealthAppIp, sendImage);
  simulator.run()
    .then(() => {
      console.log('OarmSimulator connected to slave.');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
} else if (args[0] === 'disconnect') {
  const simulator = new OarmSimulator();
  simulator.disconnect();
} else if (args[0] === 'status') {
  const simulator = new OarmSimulator();
  const status = simulator.getStatus();
  console.log(`OarmSimulator is ${status ? 'connected' : 'not connected'}.`);
} else if (args[0] === 'process-id') {
  const simulator = new OarmSimulator();
  const processId = simulator.getProcessId();
  console.log(`Process ID: ${processId}`);
} else if (args[0] === 'watch-log') {
  const simulator = new OarmSimulator();
  simulator.watchLog();
} else if (args[0] === 'create-master-config') {
  const templateFile = args[1];
  const stealthAppIp = args[2];

  const simulator = new OarmSimulator();
  simulator.createMasterConfig(templateFile, stealthAppIp);
} else if (args[0] === 'create-exam-config') {
  const templateFile = args[1];
  const examFile = args[2];

  const simulator = new OarmSimulator();
  simulator.createExamConfig(templateFile, examFile);
} else {
  console.error(`Unknown command: ${args[0]}`);
  process.exit(1);
}
