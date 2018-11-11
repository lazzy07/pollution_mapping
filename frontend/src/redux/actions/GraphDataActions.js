import {
  SET_GRAPH_DATA_MQ135,
  SET_GRAPH_DATA_MQ2,
  SET_GRAPH_DATA_MIC,
  SET_GRAPH_DATA_SOIL
} from "../actions/types";

export const setGraphDataMq135 = data => {
  return {
    type: SET_GRAPH_DATA_MQ135,
    payload: data
  };
};

export const setGraphDataMq2 = data => {
  return {
    type: SET_GRAPH_DATA_MQ2,
    payload: data
  };
};

export const setGraphDataMic = data => {
  return {
    type: SET_GRAPH_DATA_MIC,
    payload: { val: data }
  };
};

export const setGraphDataSoil = data => {
  return {
    type: SET_GRAPH_DATA_SOIL,
    payload: data
  };
};
