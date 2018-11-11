import {
  START_TIMER,
  STOP_TIMER,
  SET_COLLECT_TYPE,
  COLLECT_STATE_CHANGE
} from "../actions/types";

export const startTimer = () => {
  return {
    type: START_TIMER,
    payload: Date.now()
  };
};

export const stopTimer = () => {
  return {
    type: STOP_TIMER,
    payload: Date.now()
  };
};

export const setCollectType = data => {
  return {
    type: SET_COLLECT_TYPE,
    payload: data
  };
};

export const collectStateChange = () => {
  return {
    type: COLLECT_STATE_CHANGE
  };
};
