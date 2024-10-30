import {Response} from '../../../network/Response';
import {NewsResponse} from '../../../type/NewsApiResponse';

export default interface NewsRepository {
  getNewsList(): Promise<Response<NewsResponse>>;

  fetchNewsByCategory(category: string): Promise<Response<NewsResponse>>;

  fetchNewsListByPopularity(category: string): Promise<Response<NewsResponse>>;

  searchNews(query: string, pageSize: number): Promise<Response<NewsResponse>>;

  getCategoryBasedNews(category: string): Promise<Response<NewsResponse>>;
}
