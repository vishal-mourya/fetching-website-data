const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
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
        let title = $('a[class="_2cLu-l"]').textContent;
        let description = $('div[class="_1rcHFq"]').textContent;
        let rating = $('div[class="hGSR34"]').textContent;
        let price = $('div[class="_1vC4OE"]').textContent;

        flipkartData.push({
            title,
            description,
            rating,
            price,
        });
        // }

        const j2cp = new json2csv();
        const csv = j2cp.parse(flipkartData);

        fs.writeFileSync("./flipkartData.csv", csv, "utf-8");

    }

)();