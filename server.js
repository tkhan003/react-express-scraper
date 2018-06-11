const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const axios = require('axios');
const cheerio = require('cheerio');
const redis = require('redis');
var redisClient = redis.createClient();

// let productID = 'B079KJ9TCN'
// let base_url = `http://www.amazon.com/dp/${productID}`;


function scrape(req, res, base_url) {

    return new Promise((resolve, reject) => {
      axios.get(base_url)
        .then(function (response) {

            console.log("===SUCESSFULY SCRAPED===");

            // PARSE DATA FROM RESPONSE IF VALID URL
          let $ = cheerio.load(response.data);
          let name = $('#productTitle').text().trim();
          let dimensions = $('.size-weight').last().find('.value').text();
          let category = $('#wayfinding-breadcrumbs_feature_div a').first().text().trim();
          let rankRaw = $('#SalesRank')
              .contents()
              .filter(function () {
                  return this.nodeType === 3;
              })[0]

            let rankParsed = !!rankRaw ? rankRaw.data.trim().replace('(', '').trim(): ''

          let productInfo = {
              name: !!name ? name: '',
              rank: rankParsed,
              dimensions: !!dimensions ? dimensions: '',
              category: !!category ? category: ''
          }
          resolve(productInfo);
        })
        .catch(function (error) {
            console.log("===ERROR WHILE SCRAPED===");
            console.log(error.response.status);
            console.log("======");
            reject(error.response.status);
        });
    })

}


app.get('/api/fetch-data/:pid', (req, res) => {

    let productID = req.params.pid
    let base_url = `http://www.amazon.com/dp/${productID}`;

    console.log(`SEARCH ID ====> ${productID}`);

    redisClient.hlen(productID, function (err, reply) {

      // Doesnt exist - make api call to amazon, then save to db

      if (reply === 0) {

        scrape(req, res, base_url)
          .then(function(response) {
            console.log('scrape promise CALLBACK HOLLA');

            redisClient.hmset(productID, response);

            // send to client
            redisClient.hgetall(productID, function (err, reply) {
                res.send(reply);
            });
          })
          .catch(function(error) {
            console.log("//=======SCRAPE PROMISE RETURNED ERROR======")
            console.log(error);
            res.send({
              message: "Error from calling scraping function",
              status: error
              });
            });

      }

      else {

        console.log('ALREADY EXISTS IN DB');

        redisClient.hgetall(productID, function (err, reply) {
          res.send(reply);
          console.log("=======DIDNT HAVE TO SCRAPE, FETCHED THE FOLLOWING FROM FROM REDIS DB======");
          console.log(reply);
          console.log("=========================================================");
        });

      }
  })

});

app.listen(port, () => console.log(`Listening on port ${port}`));