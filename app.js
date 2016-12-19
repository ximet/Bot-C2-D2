const RetweetService = require('./RetweetService.js');
const FavouriteService = require('./FavouriteService.js');

const retweet = new RetweetService();
const favourite = new FavouriteService();

retweet.process();
favourite.process();
