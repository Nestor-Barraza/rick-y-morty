import { combineReducers } from 'redux';
import {
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_FAILURE,
} from './actions';

const charactersReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CHARACTER_SUCCESS:
      return [...state, action.payload];
    default:
      return state;
  }
};

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_REQUEST:
      return true;
    case FETCH_CHARACTER_SUCCESS:
    case FETCH_CHARACTER_FAILURE:
      return false;
    default:
      return state;
  }
};

const errorReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_FAILURE:
      return action.payload;
    case FETCH_CHARACTER_REQUEST:
    case FETCH_CHARACTER_SUCCESS:
      return null;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  characters: charactersReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default rootReducer;
