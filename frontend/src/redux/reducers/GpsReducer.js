import { SET_GPS_DATA } from "../actions/types";

const initialState = {};

const gpsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GPS_DATA:
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

export default gpsReducer;
