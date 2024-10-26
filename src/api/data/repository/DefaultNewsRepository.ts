import {Response} from '../../../network/Response';
import {NewsResponse} from '../../../type/NewsApiResponse';
import {
  fetchNewsByCategoryData,
  fetchNewsByPopularityData,
  getNewsListData,
  searchNewsData,
} from '../NewsApiService';
import NewsRepository from './NewsRepository';

class DefaultNewsRepository implements NewsRepository {
  async fetchNewsListByPopularity(
    category: string,
  ): Promise<Response<NewsResponse>> {
    return await fetchNewsByPopularityData(category);
  }

  async fetchNewsByCategory(category: string): Promise<Response<NewsResponse>> {
    return await fetchNewsByCategoryData(category);
  }

  async getNewsList(): Promise<Response<NewsResponse>> {
    return await getNewsListData();
  }

  async searchNews(
    query: string,
    pageSize: number,
  ): Promise<Response<NewsResponse>> {
    return await searchNewsData(query, pageSize);
  }
}

export default DefaultNewsRepository;
