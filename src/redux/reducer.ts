import {Article} from '../type/NewsApiResponse';
import {ADD_BOOKMARK, REMOVE_BOOKMARK, GET_BOOKMARKS} from './constants';

interface NewsState {
  bookmarkedArticles: Article[];
}

const initialState: NewsState = {
  bookmarkedArticles: [],
};

export default function bookmarkNewsReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_BOOKMARK:
      return {
        ...state,
        bookmarkedArticles: [...state.bookmarkedArticles, action.payload],
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarkedArticles: state.bookmarkedArticles.filter(
          article => article.url !== action.payload,
        ),
      };
    case GET_BOOKMARKS:
      return {
        ...state,
        bookmarkedArticles: action.payload,
      };
    default:
      return state;
  }
}
