import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  ARTICLE_SUBMITTED,
  ASYNC_START,
  ADD_TAG,
  REMOVE_TAG,
  UPDATE_FIELD_EDITOR,
} from "../constants/action-types";
import * as Types from "./types";

export interface EditorState {
  tagList?: string[];
  tagInput?: string;
}

export interface EditorAction {
  type: string;
  subtype: string;
  error: boolean;
  tag: Types.Tag;
  key: string;
  value: string;
  payload: {
    article: Types.Article;
    errors?: Types.Errors;
  };
}

export default (state: EditorState = {}, action: EditorAction): unknown => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        articleSlug: action.payload ? action.payload.article.slug : "",
        title: action.payload ? action.payload.article.title : "",
        description: action.payload ? action.payload.article.description : "",
        body: action.payload ? action.payload.article.body : "",
        tagInput: "",
        tagList: action.payload ? action.payload.article.tagList : [],
      };
    case EDITOR_PAGE_UNLOADED:
      return {};
    case ARTICLE_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null,
      };
    case ASYNC_START:
      if (action.subtype === ARTICLE_SUBMITTED) {
        return { ...state, inProgress: true };
      }
      break;
    case ADD_TAG:
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: "",
      };
    case REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter((tag) => tag !== action.tag),
      };
    case UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }

  return state;
};
