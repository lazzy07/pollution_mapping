import { combineReducers } from "redux";
import gpsReducer from "./GpsReducer";
import micReducer from "./MicReducer";
import mq2Reducer from "./Mq2Reducer";
import mq135Reducer from "./Mq135Reducer";
import humidityReducer from "./HumidityReducer";
import soilReducer from "./SoilReducer";
import collectReducer from "./CollectReducer";
import imageReducer from "./ImageReducer";
import graphReducer from "./GraphReducer";

export const rootReducer = combineReducers({
  graph: graphReducer,
  mq2: mq2Reducer,
  mq135: mq135Reducer,
  mic: micReducer,
  gps: gpsReducer,
  humidity: humidityReducer,
  soil: soilReducer,
  collect: collectReducer,
  images: imageReducer
});
