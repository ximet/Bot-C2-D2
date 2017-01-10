const EventEmitter = require('events').EventEmitter;
const util = require('util');
const { TwitterAddons } = require('./TwitterAddons/app.js');
const RL = require('./ReadLineInterface.js');
const requestPromise = require('request-promise');
const fetch = requestPromise.defaults({jar: true});
const { weatherAPIKey } = require('./config.js');

const fetcher = (options) => {
    return fetch(options);
};


const memoryForProperty = 10;

let isStarted = false;
let isStopped = true;

const receiveQuetion = (questionMessage) => {
    return new Promise((resolve, reject)=>{
        RL.question(questionMessage, (answer) => {
            resolve(answer);
        })
    });
};

const sendQuestion = (questionMessage) => {
    return new Promise((resolve, reject) => {
        resolve(questionMessage);
    });
};

const commandTwit = () => {
    return receiveQuetion('Your message? ')
        .then(result => {
            if (result !== '') {
                const twitterObject = new TwitterAddons();

                twitterObject.tweetedTweet(result);
            }
        })
};

const commandCurrentWeather = () => {
    return receiveQuetion('Your city? ')
        .then(city => {
            if (city !== '') {


                const urlValue = `http://api.openweathermap.org/data/2.5/weather?APPID=${weatherAPIKey}&q=${encodeURIComponent(city)}&cnt=1`;

                fetcher(urlValue)
                    .then(source => {
                        console.log(source);
                    });
            }
        })
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

    commandUser () {
        RL.on("line", (cmd) => {
            this.sendQuestionToBrain(cmd);
        });
    }

    sendQuestionToBrain (cmd) {
        this.brainWork(cmd)
            .then(result => result)
            .catch(error => console.error(error));
    }



    brainWork (cmd) {
        return new Promise((resolve, reject) => {
            switch (cmd) {
                case 'ping': {
                    return resolve(console.log("Pongue"));
                }
                case 'destroy': {
                    return resolve(process.exit(0));
                }
                case 'twit': {
                    return commandTwit();
                }
                case 'weather': {
                    return commandCurrentWeather();
                }
                default: {
                    return reject('I don\'t understand you command... Please try again. ');
                }
            }
        });

    }

    startWork () {
        receiveQuetion('Start Work? ')
            .then(result => result === 'y' ? this.commandUser() : new EventException());
    }

}

module.exports = CLI;
