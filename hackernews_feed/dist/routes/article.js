"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const article_model_1 = __importDefault(require("../models/article.model"));
exports.register = (app) => {
    app.get("/articles", cors_1.default(), (req, res) => {
        const filteredArticles = [];
        article_model_1.default.find((err, articles) => {
            if (err) {
                res.send("Error");
            }
            else {
                for (const art of articles) {
                    if (art.del !== true) {
                        filteredArticles.push(art);
                    }
                }
                res.send(filteredArticles);
            }
        });
    });
    app.post("/articles", (req, res) => {
        if (!req.body) {
            return res.status(400).send("No request body");
        }
        console.log(req.body);
        const model = new article_model_1.default(req.body);
        model.save();
    });
    app.delete("/articles/:id", cors_1.default(), (req, res) => {
        article_model_1.default.findById(req.params.id, (err, article) => {
            if (err) {
                res.send("Error");
            }
            else {
                article.del = true;
                article.save();
                res.send(article);
            }
        });
    });
};
//# sourceMappingURL=article.js.map