const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const json2csv = require('json2csv').Parser;

const movies = ["https://www.imdb.com/title/tt0242519/?ref_=vp_back",
    "https://www.imdb.com/title/tt10230414/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=bc7330fc-dcea-4771-9ac8-70734a4f068f&pf_rd_r=WMC4WR2GH4Y6RX4757HR&pf_rd_s=center-8&pf_rd_t=15021&pf_rd_i=tt0242519&ref_=tt_tp_i_3",
    "https://www.imdb.com/title/tt13178692/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=bc7330fc-dcea-4771-9ac8-70734a4f068f&pf_rd_r=VMRTHFHHV786H29WS4FG&pf_rd_s=center-8&pf_rd_t=15021&pf_rd_i=tt10230414&ref_=tt_tp_i_4"
]; // url 


(async() => {
        let imdbData = [];

        for (let movie of movies) {
            const response = await request({
                uri: movie,
                headers: {
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.5"
                },
                gzip: true,
            });

            let $ = cheerio.load(response);
            let title = $('div[class="title_wrapper"] > h1').text().trim();
            let rating = $('div[class="ratingValue"] > strong > span').text().trim();

            let summary = $('div[class="ipc-html-content ipc-html-content--base"]').text().trim();
            let releaseDate = $('a[title="See more release dates"]').text().trim();

            imdbData.push({
                title,
                rating,
                summary,
                releaseDate,
            });
        }

        const j2cp = new json2csv();
        const csv = j2cp.parse(imdbData);

        fs.writeFileSync("./imdb.csv", csv, "utf-8");

    }

)();