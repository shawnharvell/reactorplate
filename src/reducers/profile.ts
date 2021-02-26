import { PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED, FOLLOW_USER, UNFOLLOW_USER } from "../constants/action-types";

export interface ProfileAction {
  type: string;
  payload: {
    profile: Record<string, unknown>;
  };
}

export default (state = {}, action: ProfileAction): unknown => {
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
