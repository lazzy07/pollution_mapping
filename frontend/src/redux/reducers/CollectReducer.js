import {
  START_TIMER,
  STOP_TIMER,
  SET_COLLECT_TYPE,
  COLLECT_STATE_CHANGE,
  ADD_IMAGE,
  REMOVE_IMAGE,
  REMOVE_IMAGE_ARRAY
} from "../actions/types";

const initialState = {
  timerStart: 0,
  timerStop: 0,
  collectData: {
    soil: false,
    smoke: false,
    sound: false
  },
  imageArray: [],
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

    case ADD_IMAGE:
      let arr = state.imageArray;
      arr.push(action.payload);
      return {
        ...state,
        imageArray: [...arr]
      };

    case REMOVE_IMAGE:
      break;

    case REMOVE_IMAGE_ARRAY:
      return {
        ...state,
        imageArray: []
      };

    default:
      return {
        ...state
      };
  }
};

export default collectReducer;
