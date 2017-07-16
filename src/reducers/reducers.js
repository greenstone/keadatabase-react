import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { REQUEST_BANDCOMBOS, RECEIVE_BANDCOMBOS } from '../actions/bandcombos.js';
import { BIRD_REQUEST, BIRD_RECEIVE, BIRD_ERROR } from '../actions/birds.js';
import { PAGES_REQUEST, PAGES_RECEIVE, PAGES_ERROR } from '../actions/pages.js';
import { POSTS_REQUEST, POSTS_RECEIVE, POSTS_ERROR } from '../actions/posts.js';

const initialBandCombosState = {
  isFetching: false,
  items: [],
  query: ''
};

const bandcombosStore = (state = initialBandCombosState, action) => {
  switch (action.type) {
    case REQUEST_BANDCOMBOS:
      return Object.assign({}, state, {
        isFetching: true,
        query: action.query
      });
    case RECEIVE_BANDCOMBOS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.bandcombos,
        lastUpdated: action.receivedAt
      });
  default:
    return state;
  }
};

const initialBirdState = {
  isFetching: false,
  item: {},
  isError: false
};

function bird(state = initialBirdState, action) {
  switch (action.type) {
    case BIRD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case BIRD_RECEIVE:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.payload,
        isError: false
      });
    case BIRD_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        item: null,
        isError: true
      });
  default:
    return state;
  }
};

const birdsReducer = (state = {}, action) => {
  switch (action.type) {
    case BIRD_REQUEST:
    case BIRD_RECEIVE:
    case BIRD_ERROR:
      return Object.assign({}, state, {
        [action.meta.slug]: bird(state[action.meta.slug], action)
      });
  default:
    return state;
  }
};

const initialPagesState = {
  isFetching: false,
  items: [],
  isError: false
};

const pagesReducer = (state = initialPagesState, action) => {
  switch (action.type) {
    case PAGES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case PAGES_RECEIVE:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload,
        isError: false
      });
    case PAGES_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        items: null,
        isError: true
      });
  default:
    return state;
  }
};

const intialPostsState = {
  isFetching: false,
  items: [],
  isError: false
};

const postsReducer = (state = intialPostsState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case POSTS_RECEIVE:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload,
        isError: false
      });
    case POSTS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        items: null,
        isError: true
      });
  default:
    return state;
  }
};

export default combineReducers({
  bandcombosStore,
  birdsReducer,
  pagesReducer,
  postsReducer,
  form: formReducer
});
