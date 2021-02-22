const fetch = require('isomorphic-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const puppeteer = require('puppeteer');
// The below code is usefull, when we are geting response 
// in the form of json

// (async() => {
//     try {
//         const response = await fetch('https://wordpress.org/wp-json');

//         const json = await response.json();

//         console.log(JSON.stringify(json));
//     } catch (err) {
//         console.log(err);
//     }
// });


// This is using regular Expression
// (async() => {
//     try {
//         const response = await fetch('https://programmersarmy.com/c-plus-plus/gettingstarted.html');
//         var text;
//         text = await response.text()
//             .then(() => console.log(text))
//             .then(() => console.log(text.match(/(?<=\<h1>).*(?=\<\/h1>)/)))
//             .catch((err) => console.log(err.message))

//     } catch (err) {
//         console.log(err);
//     }

// })()

// (async() => {
//     const response = await fetch('https://www.snapdeal.com/');
//     const text = await response.text();
// const dom = await new JSDOM(text);
// console.log(dom.window.document.querySelector("h1").textContent);
// })()


(async() => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    await page.goto('https://www.snapdeal.com/');
    const dom = await new JSDOM(page);
    console.log(dom.window.document.querySelector("h1").textContent);

})()