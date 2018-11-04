'use strict';

const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
require('dotenv').config();

const port = process.env.PORT;

//--------------------------------------------------------------

app.get('/', allCards);

// to enable cros-origin

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//--------------------------------------------------------------

function allCards(req, res) {

  // input: { username: , repository: };
  const link = 'https://github.com/polevoyd/js-challenges';

  // prepare request to scrape cards from page
  request(link, (error, response, html) => {

    const scrap = cheerio.load(html);
    let result = scrap('.content', html).children();

    const arrayOfLinksAndNames = [];

    for (let i = 0; i < result.length; i++) {
      const nameOfFile = result[i].children[0].attribs.href.split('/')[5];
      const preLink = 'https://raw.githubusercontent.com/polevoyd/js-challenges/master/';
      arrayOfLinksAndNames.push({
        name: nameOfFile,
        content: null,
        link: preLink + nameOfFile
      });
    }

    // final array we going to 
    let arrayOfChallenges = [];

    for (let i=0; i < arrayOfLinksAndNames.length; i++) {
      request(arrayOfLinksAndNames[i].link, (error, response, html) => {
        const textFromPage = cheerio.load(html).text();
        const fileObject = {
          name: arrayOfLinksAndNames[i].name,
          code: textFromPage,
          link: arrayOfLinksAndNames[i].link
        };
        arrayOfChallenges.push(fileObject);
      });
    }
    
    console.log(arrayOfChallenges);
    console.log(`=========================================================
    =====================================================================
    =======================================================================`);

    res.send(arrayOfChallenges);








  });

}




/**
 *  listening
 */

app.listen(port, () => console.log(`Listening on port ${port}`));
