var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

var retweet = function() {
    const params = {
        q: '#nodejs, #Nodejs',
        result_type: 'recent',
        lang: 'en'
    };
    
    Twitter.get('search/tweets', params)
      .then( res => {
        if (!res.data.errors) {
            const retweetId = res.data.statuses[0].id_str;
        
            Twitter.post('statuses/retweet/:id', { id: retweetId })
                .then(res => {
                    console.log(res.response);
            });
        }
        else {
          console.log('Error: ', res.data.errors[0].message);
        }
    });
}


retweet();
// retweet in every 50 minutes
setInterval(retweet, 3000); //every 50min
