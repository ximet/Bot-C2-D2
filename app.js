const util = require('util');

process.stdin.resume();
process.stdin.setEncoding('utf8');


process.stdin.on('data', function (text) {
    console.log('received data:', util.inspect(text));
    if (text === 'quit\n') {
        done();
    }
});

function done() {
    console.log('Process Exit');
    process.exit();
}
