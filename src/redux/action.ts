import {Article} from '../type/NewsApiResponse';
import {ADD_BOOKMARK, REMOVE_BOOKMARK, GET_BOOKMARKS} from './constants';

export const addBookmark = (article: Article) => ({
  type: ADD_BOOKMARK,
  payload: article,
});

export const removeBookmark = (articleUrl: string) => ({
  type: REMOVE_BOOKMARK,
  payload: articleUrl,
});

export const setBookmarks = (articles: Article[]) => ({
  type: GET_BOOKMARKS,
  payload: articles,
});
