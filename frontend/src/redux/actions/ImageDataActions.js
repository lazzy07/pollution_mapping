import { ADD_IMAGE, REMOVE_IMAGE } from "../actions/types";

export const addImage = data => {
  return {
    type: ADD_IMAGE,
    payload: data
  };
};

export const removeImage = data => {
  return {
    type: REMOVE_IMAGE,
    payload: data
  };
};
