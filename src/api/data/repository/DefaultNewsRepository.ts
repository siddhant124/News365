import {Response} from '../../../network/Response';
import {NewsResponse} from '../../../type/NewsApiResponse';
import {
  fetchNewsByCategoryData,
  fetchNewsByPopularityData,
  getNewsListData,
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
}

export default DefaultNewsRepository;
