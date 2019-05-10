import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import request from "request";
import articleModel from "./models/article.model";
import * as articleRoute from "./routes/article";

const app = express();
const PORT = 3000;

const server = "localhost:27017";
const database = "hn_feed-navila_2019";
const user = "";
const password = "";

app.use(bodyParser.json());
articleRoute.register( app );
app.use(express.static("public"));
app.use(cors());

mongoose.connect(`mongodb://${server}/${database}`, {useNewUrlParser: true});

// tslint:disable-next-line:no-console
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`));

// article pull
function pullArticles() {
    // tslint:disable-next-line:no-console
    console.log("pulling articles");
    request("https://hn.algolia.com/api/v1/search_by_date?query=nodejs", (err, res, body) => {
        const articlesTotalJson = JSON.parse(body).hits;

        // get the newest article from the local database
        // db.articles.find().limit(1).sort({$created_at:-1})
        articleModel.find({}, {}, { limit: 1, sort: { created_at: -1 } }, (errFind, newestArticle) => {

            if (newestArticle[0] === undefined) {
                // there are no records in db
                articleModel.create(articlesTotalJson);
            } else {
                const newestArticleDate = new Date(newestArticle[0].created_at);

                // iterate over the list and compare with newestArticle.
                const articlesNewJson = [];

                for (const art of articlesTotalJson) {
                    const artDate = new Date(art.created_at);
                    if (artDate > newestArticleDate) {
                        // add art to new colection
                        articlesNewJson.push(art);
                    }
                }

                articleModel.create(articlesNewJson, (errAddArticle: any, articles: any) => {
                    if (errAddArticle) {
                        // tslint:disable-next-line:no-console
                        console.log(errAddArticle);
                    }
                });
            }
        });

    });
}

// initial pull
pullArticles();

// async articles pull once an hour
setInterval(pullArticles, 1000 * 60 * 60);
