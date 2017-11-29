import actionTypes from '../action-creators/map/mapActionTypes.js';

const initialState = {
  dimensions: {
    width: 1000,
    height: 500,
    scale: 190000,
  },
  vehicles: [],
  pathGenerators: {
    arteries: () => {},
    freeways: () => {},
    neighborhoods: () => {},
    streets: () => {},
  },
};

const mapReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PATH_GENERATORS:
      return {
        ...state,
        pathGenerators: action.pathGenerators,
      };
    case actionTypes.SET_VEHICLES:
      return {
        ...state,
        vehicles: action.vehicles,
      };
    default:
      return state;
  }
};

export default mapReducers;
