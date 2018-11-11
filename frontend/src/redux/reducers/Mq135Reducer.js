import { SET_MQ135_DATA } from "../actions/types";

const initialState = {};

const mq135Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MQ135_DATA:
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

export default mq135Reducer;
