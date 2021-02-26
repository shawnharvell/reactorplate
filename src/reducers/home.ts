import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from "../constants/action-types";

import * as Types from "./types";

export interface HomeAction {
  type: string;
  payload: {
    tags: Types.Tag[];
  };
}

export default (state = {}, action: HomeAction): unknown => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        tags: action.payload[0].tags,
      };
    case HOME_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
