import { SET_MQ2_DATA } from "../actions/types";

const initialState = {};

const mq2Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MQ2_DATA:
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

export default mq2Reducer;
