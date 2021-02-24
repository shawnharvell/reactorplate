import { PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED, FOLLOW_USER, UNFOLLOW_USER } from "../constants/action-types";

export default (state = {}, action: any): unknown => {
  switch (action.type) {
    case PROFILE_PAGE_LOADED:
      return {
        ...action.payload[0].profile,
      };
    case PROFILE_PAGE_UNLOADED:
      return {};
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return {
        ...action.payload.profile,
      };
    default:
      return state;
  }
};
