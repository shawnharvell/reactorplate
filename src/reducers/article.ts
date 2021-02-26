import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED, ADD_COMMENT, DELETE_COMMENT } from "../constants/action-types";
import * as Types from "./types";

export interface ArticleState {
  slug?: string;
  comments?: Types.Comment[];
  article?: Types.Article;
  commentErrors?: Types.Errors;
}

export interface ArticleAction {
  type?: string;
  error?: boolean;
  commentId?: number;
  payload: {
    errors?: Types.Errors;
    comment?: Types.Comment;
  };
}

export default (state: ArticleState = {}, action: ArticleAction): ArticleState => {
  switch (action.type) {
    case ARTICLE_PAGE_LOADED:
      return {
        ...state,
        article: action.payload[0].article,
        comments: action.payload[1].comments,
      };
    case ARTICLE_PAGE_UNLOADED:
      return {};
    case ADD_COMMENT:
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error ? null : (state.comments || []).concat([action.payload.comment]),
      };
    case DELETE_COMMENT: {
      const { commentId } = action;
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== commentId),
      };
    }
    default:
      return state;
  }
};
