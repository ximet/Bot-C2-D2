const twit = require('twit');
const config = require('./config.js');
const RetweetService = require('./RetweetService.js');
const FavouriteService = require('./FavouriteService.js');

const Twitter = new twit(config);

const params = {
    q: '#nodejs, #Nodejs',
    result_type: 'recent',
    lang: 'en'
};

RetweetService.retweet(Twitter, params);
setInterval(RetweetService.retweet, 300000);

FavouriteService.favourite(Twitter, params);
setInterval(FavouriteService.favourite, 300000);
