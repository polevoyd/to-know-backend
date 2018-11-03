'use strict';

const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
require('dotenv').config();

const port = process.env.PORT;

//--------------------------------------------------------------

app.get('/', allCards);

//--------------------------------------------------------------

function allCards(req, res) {

  // input: { username: , repository: };
  const link = 'https://github.com/polevoyd/js-challenges';

  // prepare request to scrape cards from page
  request(link, (error, response, html) => {

    const scrap = cheerio.load(html);
    let result = scrap('.content', html).children();

    const arrayOfLinks = [];

    for (let i = 0; i < result.length; i++) {
      const nameOfFile = result[i].children[0].attribs.href.split('/')[5];
      const preLink = 'https://raw.githubusercontent.com/polevoyd/js-challenges/master/';
      arrayOfLinks.push(preLink + nameOfFile);
    }

    console.log(arrayOfLinks);
    // arrayOfLinks - iterate and request content of 'pre' tag from each page
    const arrayOfContent = arrayOfLinks.map(link => {
      request(link, (error, response, html) => {
        const textFromPage = cheerio.load(html).text();
        // let result = scrap('pre', html);

        console.log('///////////////////////////////////////////////////////////');
        console.log(textFromPage);
      });
    });








    res.send('hello!');

  });

}




/**
 *  listening
 */

app.listen(port, () => console.log(`Listening on port ${port}`));
