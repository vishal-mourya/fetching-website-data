const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const json2csv = require('json2csv').Parser;

const products = ["https://www.flipkart.com/realme-buds-q-bluetooth-headset/p/itm9d0d4b3692656?pid=ACCFVWN4PGNTEFGY&lid=LSTACCFVWN4PGNTEFGYNDRHV5&marketplace=FLIPKART&srno=s_1_1&otracker=search&otracker1=search&fm=organic&iid=4e43115a-a55f-4275-9fc9-985e7b9bb545.ACCFVWN4PGNTEFGY.SEARCH&ppt=sp&ppn=sp&ssid=lbwnbinrnmp5gge81602392352779&qH=54597ea1f2fc7f2e",
    "https://www.flipkart.com/redmi-sonicbass-neckband-bluetooth-headset/p/itm85b524096efd6?pid=ACCFWYGTATKQXBBU&lid=LSTACCFWYGTATKQXBBUCDKJAT&marketplace=FLIPKART&srno=s_1_2&otracker=search&otracker1=search&fm=organic&iid=4e43115a-a55f-4275-9fc9-985e7b9bb545.ACCFWYGTATKQXBBU.SEARCH&ppt=sp&ppn=sp&ssid=lbwnbinrnmp5gge81602392352779&qH=54597ea1f2fc7f2e",
    "https://www.flipkart.com/oneplus-bullets-wireless-z-bluetooth-headset/p/itm0fa6e667285c4?pid=ACCFR3Q77R6RRGAC&lid=LSTACCFR3Q77R6RRGAC2RJOEB&marketplace=FLIPKART&srno=s_1_4&otracker=search&otracker1=search&fm=organic&iid=4e43115a-a55f-4275-9fc9-985e7b9bb545.ACCFR3Q77R6RRGAC.SEARCH&ppt=sp&ppn=sp&ssid=lbwnbinrnmp5gge81602392352779&qH=54597ea1f2fc7f2e",
    "https://www.flipkart.com/realme-buds-2-wired-headset/p/itmd133c94c44d50?pid=ACCFKYE2ARGG67WC&lid=LSTACCFKYE2ARGG67WCJNAGYI&marketplace=FLIPKART&srno=s_1_6&otracker=search&otracker1=search&fm=organic&iid=4e43115a-a55f-4275-9fc9-985e7b9bb545.ACCFKYE2ARGG67WC.SEARCH&ppt=sp&ppn=sp&ssid=lbwnbinrnmp5gge81602392352779&qH=54597ea1f2fc7f2e"
]; // url 

// const product = "https://www.flipkart.com/realme-buds-q-bluetooth-headset/p/itm9d0d4b3692656?pid=ACCFVWN4PGNTEFGY&lid=LSTACCFVWN4PGNTEFGYNDRHV5&marketplace=FLIPKART&srno=s_1_1&otracker=search&otracker1=search&fm=organic&iid=4e43115a-a55f-4275-9fc9-985e7b9bb545.ACCFVWN4PGNTEFGY.SEARCH&ppt=sp&ppn=sp&ssid=lbwnbinrnmp5gge81602392352779&qH=54597ea1f2fc7f2e";


(async() => {
        let flipkartData = [];

        for (let product of products) {
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

            let title = $('span[class="_35KyD6"]').text();
            let rating = $('div[class="hGSR34"]').text();
            let price = $('div[class="_1vC4OE _3qQ9m1"]').text();
            let discount = $('div[class="VGWI6T _1iCvwn"] > span ').text();
            // let discount = $('div[class="VGWI6T _1iCvwn"] > span ').textContent;

            flipkartData.push({
                title,
                rating,
                price,
                discount
            });
        }

        console.log(flipkartData);

        const j2cp = new json2csv();
        const csv = j2cp.parse(flipkartData);

        fs.writeFileSync("./flipkartData-1-page.csv", csv, "utf-8");

    }

)();