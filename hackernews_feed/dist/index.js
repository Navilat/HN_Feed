"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const request_1 = __importDefault(require("request"));
const article_model_1 = __importDefault(require("./models/article.model"));
const articleRoute = __importStar(require("./routes/article"));
const app = express_1.default();
const PORT = 3000;
const server = "localhost:27017";
const database = "hn_feed-navila_2019";
const user = "";
const password = "";
app.use(body_parser_1.default.json());
articleRoute.register(app);
app.use(express_1.default.static("public"));
app.use(cors_1.default());
mongoose_1.default.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true });
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`));
function pullArticles() {
    console.log("pulling articles");
    request_1.default("https://hn.algolia.com/api/v1/search_by_date?query=nodejs", (err, res, body) => {
        const articlesTotalJson = JSON.parse(body).hits;
        article_model_1.default.find({}, {}, { limit: 1, sort: { created_at: -1 } }, (errFind, newestArticle) => {
            if (newestArticle[0] === undefined) {
                article_model_1.default.create(articlesTotalJson);
            }
            else {
                const newestArticleDate = new Date(newestArticle[0].created_at);
                const articlesNewJson = [];
                for (const art of articlesTotalJson) {
                    const artDate = new Date(art.created_at);
                    if (artDate > newestArticleDate) {
                        articlesNewJson.push(art);
                    }
                }
                article_model_1.default.create(articlesNewJson, (errAddArticle, articles) => {
                    if (errAddArticle) {
                        console.log(errAddArticle);
                    }
                });
            }
        });
    });
}
pullArticles();
setInterval(pullArticles, 1000 * 60 * 60);
//# sourceMappingURL=index.js.map