const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const axios = require('axios');
const cheerio = require('cheerio');

let base_url = 'http://www.amazon.com/dp/B002QYW8LW';

app.get('/api/fetch-data', (req, res) => {

    axios.get(base_url)
        .then(function (response) {

            let $ = cheerio.load(response.data);
            let name = $('#productTitle').text().trim();
            let dimensions = $('.size-weight').last().find('.value').text();
            let category = $('#wayfinding-breadcrumbs_feature_div a').first().text().trim();
            let rankRaw = $('#SalesRank .value')
                .contents()
                .filter(function () {
                    return this.nodeType === 3;
                })[0].data.trim().replace('(', '').trim();

            res.send({
                name: name,
                rank: rankRaw,
                dimensions: dimensions,
                category: category
            });

        })
        .catch(function (error) {
            console.log(error);
        });

});

app.listen(port, () => console.log(`Listening on port ${port}`));