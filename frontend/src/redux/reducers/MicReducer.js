import { SET_MIC_DATA } from "../actions/types";

const initialState = {
  value: 0
};

const micReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MIC_DATA:
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

export default micReducer;
