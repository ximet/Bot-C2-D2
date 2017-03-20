const requestPromise = require('request-promise');
const fetch = requestPromise.defaults({jar: true});

const fetcher = (options) => {
    return fetch(options);
};


class Translate {

    constructor(receiveQuestion) {
        this.receiveQuestion = receiveQuestion;
    }

    commandTranslate ()  {
        return this.receiveQuestion('Your word? ')
            .then(sourceText => {
                if (sourceText !== '') {
                    const urlValue = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${sourceText}&cnt=1`;

                    fetcher(urlValue)
                        .then(source => {
                            console.log('source Text Rus:', source);
                            const translatedText = /\[\[\[\"\W+\"\,/g.exec(source);
                            console.log('Text Rus:', translatedText);
                            const clearTranslatedText = translatedText[0].split("[").join("").split("\"").join("").split(",").join("");

                            console.log('Translate to : ', clearTranslatedText);
                        });
                }
            })
    }



}

module.exports = Translate;
