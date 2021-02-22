const axios = require('axios');
const cheerio = require('cheerio');

// const url = 'https://news.ycombinator.com';
const url = 'https://www.programmersarmy.com';

// axios— Promise based HTTP client
// for the browser and node.js.

// cheerio— jQuery
// for Node.js.Cheerio makes it easy to select, edit,
// and view DOM elements.

axios.get(url)
    .then(response => {
        // console.log(response.data);
        getData(response.data);
    })
    .catch(error => {
        console.log(error);
    })

let getData = html => {
    data = [];
    const $ = cheerio.load(html);

    $('table.itemlist tr td:nth-child(3)').each((i, elem) => {
        data.push({
            title: $(elem).text(),
            link: $(elem).find('a.storylink').attr('href')
        });
    });
    console.log(data);
}