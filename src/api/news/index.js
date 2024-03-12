import { deepCopy } from '../../utils/deep-copy';
import { cryptoNews,cryptoNewsArticle } from './data';

class NewsApi {
  getNews(request) {
    return Promise.resolve(deepCopy(cryptoNews));
  }
  getNewsArticle(id) {
    const foundNews = id ? cryptoNewsArticle.find(p => p.id === id) : deepCopy(cryptoNewsArticle[0]);
    
    if (!foundNews) {
      return Promise.reject(new Error('Article not found'));
    }

    return Promise.resolve(deepCopy(foundNews));
  }
}

export const newsApi = new NewsApi();



