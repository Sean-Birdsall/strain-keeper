console.log("The bot is starting!");

var Twit = require('twit');

var T = new Twit({
  consumer_key:         '...',
  consumer_secret:      '...',
  access_token:         '...',
  access_token_secret:  '...',
});

var strainFromKeeper = "Lemon Haze";

var params = {
  q: 'strain OR weed OR marijuana OR cannabis ' + strainFromKeeper + ' -filter:links -RT -sale',
  lang: 'en',
  count: 5

}

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
  var tweets = data.statuses;
  // console.log(data[0].text);
  // console.log(data.statuses);
  for (var i = 0; i < tweets.length; i++) {
    console.log(tweets[i].text);
    console.log("========================================================================");
  }

}
