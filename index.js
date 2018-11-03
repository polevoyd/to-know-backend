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

  const link = 'https://github.com/polevoyd/js-challenges';

  // prepare request to scrape cards from page

  request(link, (error, response, html) => {

    const scrap = cheerio.load(html);
    let result = scrap('.content', html).children();

    const arrayOfLinks = [];

    for (let i = 0; i < result.length; i++) {
    //   arrayOfLinks.push(result[i].children[0].attribs.href);

    console.log('####################################################');
    console.log(result[i].children[0].attribs.href.split('/')[5]);
    
    }

    // https://github.com/polevoyd/js-challenges/blob/master/ADS.js
    // https://raw.githubusercontent.com/polevoyd/js-challenges/master/ADS.js








    res.send('hello!');

  });

}




/**
 *  listening
 */

app.listen(port, () => console.log(`Listening on port ${port}`));
