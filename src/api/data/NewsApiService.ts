import {AxiosApiService} from '../../network/AxiosApiService';
import {BASE_URL} from '../../network/NetworkUrl';
import {Response} from '../../network/Response';
import {API_KEY} from '../../network/secretKeys/NewsAPIKey';
import {NewsResponse} from '../../type/NewsApiResponse';

export async function getNewsListData(): Promise<Response<NewsResponse>> {
  return await AxiosApiService().get(
    `${BASE_URL}/top-headlines?apiKey=${API_KEY}&category=business&country=us`,
  );
}

// Fetch news by category
export async function fetchNewsByCategoryData(
  category: string,
): Promise<Response<NewsResponse>> {
  return await AxiosApiService().get(
    `${BASE_URL}/top-headlines?apiKey=${API_KEY}&category=${category}&country=us&pageSize=1&page=1`,
  );
}

export async function fetchNewsByPopularityData(
  category: string,
): Promise<Response<NewsResponse>> {
  return await AxiosApiService().get(
    `${BASE_URL}/top-headlines?category=${category}&pageSize=3&page=1&country=us&apiKey=${API_KEY}&sortBy=popularity`,
  );
}
