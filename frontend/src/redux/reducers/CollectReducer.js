import {
  START_TIMER,
  STOP_TIMER,
  SET_COLLECT_TYPE,
  COLLECT_STATE_CHANGE
} from "../actions/types";

const initialState = {
  timerStart: 0,
  timerStop: 0,
  collectData: {
    soil: false,
    smoke: false,
    sound: false
  },
  collectType: "Collect"
};

const collectReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        timerStart: action.payload
      };

    case STOP_TIMER:
      return {
        ...state,
        timerStop: action.payload,
        timerStart: 0
      };

    case SET_COLLECT_TYPE:
      let temp = state.collectData;
      return {
        ...state,
        collectData: {
          ...temp,
          ...action.payload
        }
      };

    case COLLECT_STATE_CHANGE:
      if (state.collectType === "Collect") {
        return {
          ...state,
          collectType: "Collecting..."
        };
      } else {
        return {
          ...state,
          collectType: "Collect"
        };
      }

    default:
      return {
        ...state
      };
  }
};

export default collectReducer;
