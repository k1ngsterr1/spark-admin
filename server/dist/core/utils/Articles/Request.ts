import { ArticleDetails } from "./types";

export interface AddArticleRequest extends ArticleDetails{
    userId: number;
}