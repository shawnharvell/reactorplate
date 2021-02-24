import { SETTINGS_SAVED, SETTINGS_PAGE_UNLOADED, ASYNC_START } from "../constants/action-types";

export default (state = {}, action: { type: unknown; error: unknown; payload: { errors: unknown } }): unknown => {
  switch (action.type) {
    case SETTINGS_SAVED:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null,
      };
    case SETTINGS_PAGE_UNLOADED:
      return {};
    case ASYNC_START:
      return {
        ...state,
        inProgress: true,
      };
    default:
      return state;
  }
};
