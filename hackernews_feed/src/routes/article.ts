import cors from "cors";
import * as express from "express";
import articleModel from "../models/article.model";

export const register = ( app: express.Application ) => {

    app.get("/articles", cors(), (req, res) => {
        const filteredArticles: any[] = [];

        articleModel.find((err: any, articles: any) => {
           if (err) {
               res.send("Error");
           } else {
               // filtering articles with "del": true
               for (const art of articles) {
                   if (art.del !== true) {
                       filteredArticles.push(art);
                   }
               }

               // res.send(articles);
               res.send(filteredArticles);
           }
       });
    });

    app.post("/articles", (req, res) => {
        if (!req.body) {
            return res.status(400).send("No request body");
        }

        // tslint:disable-next-line:no-console
        console.log(req.body);

        const model = new articleModel(req.body);
        model.save();
    });

    app.delete("/articles/:id", cors(), (req, res) => {
        // res.send(`you have requested to delete article ${req.params.id}`);

        articleModel.findById(req.params.id, (err: any, article: any) => {
            if (err) {
                res.send("Error");
            } else {
                // update value of key "del" to true, so it wont show.
                article.del = true;
                article.save();
                res.send(article);
            }
        });
    });
};
