const cliClass = require('./cli.js');
const cli = new cliClass();

// cli.startWork();

const RL = require('./ReadLineInterface.js');


RL.on("line", (cmd) => {
    console.log(cmd);
});
