import { ALERT_MESSAGE, ALERT_ERROR } from "./types";

export const message = msg => {
  return {
    type: ALERT_MESSAGE,
    payload: msg
  };
};

export const error = error => {
  return {
    type: ALERT_ERROR,
    payload: error
  };
};
