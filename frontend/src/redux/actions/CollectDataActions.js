import {
  START_TIMER,
  STOP_TIMER,
  SET_COLLECT_TYPE,
  COLLECT_STATE_CHANGE,
  ADD_IMAGE,
  REMOVE_IMAGE,
  REMOVE_IMAGE_ARRAY
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

export const addImage = data => {
  return {
    type: ADD_IMAGE,
    payload: data
  };
};

export const removeImage = index => {
  return {
    type: REMOVE_IMAGE,
    payload: index
  };
};

export const removeImageArray = () => {
  return { type: REMOVE_IMAGE_ARRAY };
};
