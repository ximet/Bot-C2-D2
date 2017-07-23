const EventEmitter = require('events').EventEmitter;
const util = require('util');
const Brain = require('./brain.js');
const { TwitterAddons } = require('./TwitterAddons/app.js');
const Weather = require('./WeatherAddons/Weather.js');

const RL = require('./ReadLineInterface.js');
const requestPromise = require('request-promise');
const fetch = requestPromise.defaults({jar: true});

const fetcher = (options) => {
    return fetch(options);
};


const memoryForProperty = 10;

let isStarted = false;
let isStopped = true;



class CLI extends EventEmitter {
    constructor() {
        super();
        this.brain = new Brain();
    }

    commandUser () {
        RL.on("line", (cmd) => {
            this.sendQuestionToBrain(cmd);
        });
    }

    sendQuestionToBrain (cmd) {
        this.brain.brainWork(cmd)
            .then(result => result)
            .catch(error => console.error(error));
    }



    startWork () {
        this.commandUser();
    }

}

module.exports = CLI;
