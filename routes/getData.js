const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.use(express.json()); // this will allow us to parseJson

router.post('/', async(req, res) => {


    const product = req.body.url;


    (async() => {
        let flipkartData = [];

        const response = await request({
            uri: product,
            headers: {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.5"
            },
            gzip: true,
        });

        let $ = cheerio.load(response);
        // console.log(response);

        // write to a new file named 2pac.txt
        // fs.writeFile('./flipkart-page.html', response, (err) => {
        //     // throws an error, you could also catch it here
        //     if (err) throw err;

        //     // success case, the file was saved
        //     console.log('response saved in flipkart-page.html');
        // });


        // let titles = [$('a[class="_2cLu-l"]').text(), ];
        // console.log(titles);
        // let descriptions = [$('div[class="_1rcHFq"]').text()];
        // let ratings = [$('div[class="hGSR34"]').text()];
        // let prices = [$('div[class="_1vC4OE"]').text()];

        let title = $('a[class="_2cLu-l"]').text();
        // console.log(titles);
        let description = $('div[class="_1rcHFq"]').text();
        let rating = $('div[class="hGSR34"]').text();
        let price = $('div[class="_1vC4OE"]').text();

        // let price = $('div[class="_1vC4OE"]').textContent;

        // var i = 0;
        // for (let title in titles) {
        //     flipkartData.push({
        //         title: title,
        //         description: descriptions[i],
        //         rating: ratings[i],
        //         price: prices[i]
        //     });
        //     i++;
        // }

        // }

        flipkartData.push({
            title: title,
            description: description,
            rating: rating,
            price: price
        });

        // let genre = new Genre({
        //     // id: genres.length + 1,
        //     name: req.body.name
        // });

        // genres.push(data);
        // genre = await genre.save();

        res.send(flipkartData);
    });
});
module.exports = router;