import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsService {
  constructor(private readonly httpService: HttpService) {}

  getNews() {
    return this.httpService.axiosRef.get(
      'https://newsapi.org/v2/everything?q=finanzas',
      {
        headers: {
          'X-Api-Key': process.env.NEWS_API_KEY,
        },
      },
    );
  }

  getTopHeadlines() {
    return this.httpService.axiosRef.get(
      'https://newsapi.org/v2/top-headlines?country=us&category=business',
      {
        headers: {
          'X-Api-Key': process.env.NEWS_API_KEY,
        },
      },
    );
  }
}
