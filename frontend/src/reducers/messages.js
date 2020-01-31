import { ALERT_MESSAGE, ALERT_ERROR } from "../actions/types";

const initialState = {
  message: null,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ALERT_MESSAGE:
      return { ...state, message: action.payload };
    case ALERT_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
