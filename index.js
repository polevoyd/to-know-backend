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








    res.send('hello!');

  });

}




/**
 *  listening
 */

app.listen(port, () => console.log(`Listening on port ${port}`));
