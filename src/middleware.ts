/* eslint-disable no-param-reassign, @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
import agent from "./agent";
import { ASYNC_START, ASYNC_END, LOGIN, LOGOUT, REGISTER } from "./constants/action-types";

const promiseMiddleware = (store: any) => (next: (arg0: any) => void) => (action: any) => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const { skipTracking } = action;

    action.payload.then(
      (res: any) => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      (error: { response: { body: any } }) => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        action.error = true;
        action.payload = error.response.body;
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        }
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = () => (next: any) => (action: any) => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if (!action.error) {
      window.localStorage.setItem("jwt", action.payload.user.token);
      agent.setToken(action.payload.user.token);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem("jwt", "");
    agent.setToken(null);
  }

  next(action);
};

function isPromise(v: any) {
  return v && typeof v.then === "function";
}

export { promiseMiddleware, localStorageMiddleware };
