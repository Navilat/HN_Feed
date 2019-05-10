"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
exports.ArticleSchema = new mongoose.Schema({
    author: String,
    created_at: String,
    del: Boolean,
    story_title: String,
    story_url: String,
    title: String,
    url: String
});
const articleModel = mongoose.model("Article", exports.ArticleSchema);
exports.default = articleModel;
//# sourceMappingURL=article.model.js.map