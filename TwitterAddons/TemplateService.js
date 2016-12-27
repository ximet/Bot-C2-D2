const twit = require('twit');
const config = require('./config.js');

const Twitter = new twit(config);


class TemplateBot {
    searchInTwitter (params) {
        return Twitter.get('search/tweets', params);
    }

    getParam () {
        return {
            q: '#nodejs, #Nodejs',
            result_type: 'recent',
            lang: 'en'
        };
    }

    taskBot (tweet) {
        return new Error();
    }

    runTask () {
        const params = this.getParam();

        this.searchInTwitter(params)
            .then(tweet => this.taskBot(tweet))
            .catch(err => console.log(err));
    }
}

module.exports = TemplateBot;
