'use strict';

/*
 *  setting up
 */

const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT;

/*
 *  routing
 */

app.get('/', allCards);

/**
 *  main part
 */

function allCards(request, response) {

  
  // set a page for parsing (need to make validation here)

  const link = 'https://repl.it/@polevoyd';
  // prepare request to scrape cards from page
  let xhr = new XMLHttpRequest();
  xhr.onload = function(){
    const doc = this.responseXML;
    // select all cards and push them into array
    doc.querySelectorAll('.repl-item-title').forEach(element => {
      const cardObject = {
        name: element.innerText,
        category: 'new'
      };
      console.log(cardObject);
    });
  };
  xhr.open('GET', link);
  xhr.responseType = 'document';
  xhr.send();

  // after request sent, wait 2 sec and dispatch array to state
  //   setTimeout(() => {
  // this.props.dispatch(addCards(userName, arrayOfCards));
  // arrayOfCards = [];
  //   }, 2000);

  response.send('hello!');

}




/**
 *  listening
 */

app.listen(port, () => console.log(`Listening on port ${port}`));
