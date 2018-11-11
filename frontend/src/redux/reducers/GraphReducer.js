import {
  SET_GRAPH_DATA_MQ135,
  SET_GRAPH_DATA_MQ2,
  SET_GRAPH_DATA_MIC,
  SET_GRAPH_DATA_SOIL
} from "../actions/types";
import { MAX_SENSOR_DATA_ARRAY } from "../../constants";

const initialState = {
  mq2: [],
  mq135: [],
  mic: [],
  humidity: [],
  soil: []
};

const sendDataToGraphData = (data, arr) => {
  const graphData = arr;

  var date = Date().toString();
  data.timeString = date.substr(15, 9);

  if (graphData.length > MAX_SENSOR_DATA_ARRAY) {
    graphData.splice(0, 1);
    graphData.push(data);
  } else {
    graphData.push(data);
  }
  return graphData;
};

const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GRAPH_DATA_MQ135:
      return {
        ...state,
        mq135: sendDataToGraphData(action.payload, state.mq135)
      };

    case SET_GRAPH_DATA_MQ2:
      return {
        ...state,
        mq2: sendDataToGraphData(action.payload, state.mq2)
      };

    case SET_GRAPH_DATA_MIC:
      return {
        ...state,
        mic: sendDataToGraphData(action.payload, state.mic)
      };

    case SET_GRAPH_DATA_SOIL:
      return {
        ...state,
        soil: sendDataToGraphData(action.payload, state.soil)
      };

    default:
      return {
        ...state
      };
  }
};

export default graphReducer;
