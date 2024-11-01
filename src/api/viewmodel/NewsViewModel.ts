import {Response} from '../../network/Response';
import {NewsResponse} from '../../type/NewsApiResponse';
import DefaultNewsRepository from '../data/repository/DefaultNewsRepository';
import NewsRepository from '../data/repository/NewsRepository';

class NewsViewModel {
  private newsRepository: NewsRepository = new DefaultNewsRepository();

  async getNewsList(): Promise<Response<NewsResponse>> {
    const response = await this.newsRepository.getNewsList();
    return response;
  }

  async fetchNewsByCategory(category: string): Promise<Response<NewsResponse>> {
    const response = await this.newsRepository.fetchNewsByCategory(category);
    return response;
  }

  async fetchNewsListByPopularoty(
    category: string,
  ): Promise<Response<NewsResponse>> {
    const response = await this.newsRepository.fetchNewsListByPopularity(
      category,
    );
    return response;
  }

  async searchNews(
    query: string,
    pageSize: number,
  ): Promise<Response<NewsResponse>> {
    const response = await this.newsRepository.searchNews(query, pageSize);
    return response;
  }

  async getCategoryBasedNews(
    category: string,
  ): Promise<Response<NewsResponse>> {
    const response = await this.newsRepository.getCategoryBasedNews(category);
    return response;
  }
}

export default NewsViewModel;
