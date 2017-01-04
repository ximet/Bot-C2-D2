const EventEmitter = require('events').EventEmitter;
const util = require('util');
const { TwitterAddons } = require('./TwitterAddons/app.js');
const RL = require('./ReadLineInterface.js');


const memoryForProperty = 10;

let isStarted = false;
let isStopped = true;

const setQuetion = (questionMessage) => {
    return new Promise((resolve, reject)=>{
        RL.question(questionMessage, (answer) => {
            resolve(answer);
        })
    });
};

class CLI extends EventEmitter {
    constructor() {
        super();


        this.stdin = process.stdin;
        this.stdout = process.stdout;

        this.stdin.resume();
        this.stdin.setEncoding('utf8');

        this.startListening = this.startListening.bind(this);
        this.stopListening = this.stopListening.bind(this);
    }

    startListening () {
        const self = this;
        const twitterObject = new TwitterAddons();

        if (isStarted === true) {
            return;
        }

        this.stdin.on('data', function (text) {
            console.log(process.argv);
            console.log('received data:', util.inspect(text));
            if (text === 'twit please\n') {
                twitterObject.tweetedTweet('Yohooo first tweet from bot c2-d2');
            }
            if (text === 'quit\n') {
                self.stopListening();
            }
        });

        this.emit('start');
        isStarted = true;
        isStopped = false;
    }

    stopListening () {
        if (isStopped || !isStarted) {
            return;
        }

        this.stdin.destroy();
        this.emit('stop');
        isStopped = true;
        isStarted = false;
    }

    startWork () {
        setQuetion('Start Work? ')
            .then(result => result === 'y' ? console.log('OK, Let\'s go') : new EventException());
    }

}

module.exports = CLI;
