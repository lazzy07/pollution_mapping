import { SET_SOIL_DATA } from "../actions/types";

const initialState = {
  value: 0
};

const soilReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOIL_DATA:
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

export default soilReducer;
