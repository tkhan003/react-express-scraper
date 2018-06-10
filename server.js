const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const axios = require('axios');
const cheerio = require('cheerio');
const redis = require('redis');
var redisClient = redis.createClient();

// let productID = 'B079KJ9TCN'
// let base_url = `http://www.amazon.com/dp/${productID}`;


// IN REDIS CLI- TYPE KEYS * TO SEE ALL KEYS

function scrape(req, res, base_url) {

    return new Promise((resolve, reponse) => {
      axios.get(base_url)
        .then(function (response) {
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
            console.log(error);
        });
    })

}


app.get('/api/fetch-data/:pid', (req, res) => {

    let productID = req.params.pid
    let base_url = `http://www.amazon.com/dp/${productID}`;

    redisClient.hlen(productID, function (err, reply) {

    // Doesnt exist - make api call to amazon, then save to db
    if (reply === 0) {

      scrape(req, res, base_url)
        .then(function(response) {
            console.log(response);

            redisClient.hmset(productID, response);

            // send to client
            redisClient.hgetall(productID, function (err, reply) {
                res.send(reply);
            });

        })
        .catch(function(error) {
            console.log(error);
        });

    }

    else {
        redisClient.hgetall(productID, function (err, reply) {
            console.log(reply);
            res.send(reply);
        });
    }

  })

});

app.listen(port, () => console.log(`Listening on port ${port}`));