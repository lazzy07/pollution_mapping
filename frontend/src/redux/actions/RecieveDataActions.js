import {
  SET_MIC_DATA,
  SET_GPS_DATA,
  SET_HUMIDITY_DATA,
  SET_MQ2_DATA,
  SET_MQ135_DATA,
  SET_SOIL_DATA
} from "./types";

export const setMicData = data => {
  return {
    type: SET_MIC_DATA,
    payload: data
  };
};

export const setGpsData = data => {
  return {
    type: SET_GPS_DATA,
    payload: data
  };
};

export const setMq2Data = data => {
  return {
    type: SET_MQ2_DATA,
    payload: data
  };
};

export const setHumidityData = data => {
  return {
    type: SET_HUMIDITY_DATA,
    payload: data
  };
};

export const setMq135Data = data => {
  return {
    type: SET_MQ135_DATA,
    payload: data
  };
};

export const setSoilData = data => {
  return {
    type: SET_SOIL_DATA,
    payload: data
  };
};
