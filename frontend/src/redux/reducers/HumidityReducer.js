import { SET_HUMIDITY_DATA } from "../actions/types";

const initialState = {};

const humidityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HUMIDITY_DATA:
      return {
        ...state,
        ...action.payload
      };

    default:
      return {
        ...state
      };
  }
};

export default humidityReducer;
