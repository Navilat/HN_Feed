import * as mongoose from "mongoose";

export interface IArticle extends mongoose.Document {
    author: string;
    created_at: string;
    del: boolean;
    story_title: string;
    story_url: string;
    title: string;
    url: string;
}

export const ArticleSchema = new mongoose.Schema({
    author: String,
    created_at: String,
    del: Boolean,
    story_title: String,
    story_url: String,
    title: String,
    url: String
});

const articleModel = mongoose.model<IArticle>("Article", ArticleSchema);

export default articleModel;
