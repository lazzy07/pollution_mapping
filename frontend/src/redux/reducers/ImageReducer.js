import { ADD_IMAGE, REMOVE_IMAGE } from "../actions/types";

const initialState = [];

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      if (state.images.length < 4) {
        let img = state;
        img.push(action.payload);
        return img;
      } else {
        let img = state;
        img.splice(0, 1);
        img.push(action.payload);
        return img;
      }

    case REMOVE_IMAGE:
      let img = state;
      img.splice(action.payload, 1);
      return img;

    default:
      return state;
  }
};

export default imageReducer;
