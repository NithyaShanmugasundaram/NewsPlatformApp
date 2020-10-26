import { FETCH_ARTICLES, FETCH_ERROR, CLEAR_ARTICLES } from "../actions/types";


const initialState = {
  articles: [],
  error: "",
};

export default function (state = initialState, action) {
  
  switch (action.type) {
    case FETCH_ARTICLES:
      return {
        ...state,
        articles: [...state.articles, ...action.payload],  
      };
    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case CLEAR_ARTICLES:
      return {
        ...state,
        articles: [],
      };

    default:
      return state;
  }
}
