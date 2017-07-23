class Brain {
  constructor() {

  }

  brainWork (cmd) {
      const weather = new Weather(receiveQuetion);

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
                  return weather.commandCurrentWeather();
              }
              case 'forecast': {
                  return weather.commandForecastWeather();
              }
              case 'translate': {
                  return whichLanguageTranslate();
              }
              default: {
                  return reject('I don\'t understand you command... Please try again. ');
              }
          }
      });

  }
}

module.exports = Brain;
