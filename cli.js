const EventEmitter = require('events').EventEmitter;
const util = require('util');

const done = () => {
    console.log('Process Exit');
    process.exit();
};

class CLI extends EventEmitter {
    constructor() {
        super();
        console.log('Initialize');
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
    }

    startListening () {
        console.log('listen');
        process.stdin.on('data', function (text) {
            console.log('received data:', util.inspect(text));
            if (text === 'quit\n') {
                done();
            }
        });
    }

}

module.exports = CLI;
