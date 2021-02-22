const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const { title } = require('process');
const json2csv = require('json2csv').Parser;

// const products = ["https://www.flipkart.com/search?q=earphones&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off",
// ]; // url 

const product = "https://www.flipkart.com/search?q=earphones&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off";


(async() => {
        let flipkartData = [];

        // for (let product of products) {
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
        fs.writeFile('./flipkart-page.html', response, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;

            // success case, the file was saved
            console.log('response saved in flipkart-page.html');
        });


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

        const j2cp = new json2csv();
        const csv = j2cp.parse(flipkartData);

        fs.writeFileSync("./flipkartData.csv", csv, "utf-8");

    }

)();