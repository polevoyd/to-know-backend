'use strict';

const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
require('dotenv').config();

const port = process.env.PORT;

//--------------------------------------------------------------

app.get('/', (req, res) => {

  const nameRepo = req.query.repo.split('/').splice(3,3).join('/').concat('/master/');

  // input: { username: , repository: };
  const link = req.query.repo;

  // prepare request to scrape cards from page
  request(link, (error, response, html) => {

    const scrap = cheerio.load(html);
    let result = scrap('.content', html).children();

    const arrayOfLinksAndNames = [];

    for (let i = 0; i < result.length; i++) {
      const nameOfFile = result[i].children[0].attribs.href.split('/')[5];
      const preLink = `https://raw.githubusercontent.com/${nameRepo}`;
      arrayOfLinksAndNames.push({
        name: nameOfFile,
        link: preLink + nameOfFile
      });
    }

    res.send(arrayOfLinksAndNames);
  });
});

//--------------------------------------------------------------
// listening 

app.listen(port, () => console.log(`Listening on port ${port}`));
