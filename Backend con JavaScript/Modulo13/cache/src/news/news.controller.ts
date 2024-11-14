import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { NewsService } from './news.service';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Get()
  async news() {
    // { key: 'news', data [...], ttl: 60  }

    const cacheNews = await this.cacheManager.get('news');

    if (!cacheNews) {
      const { data } = await this.newsService.getNews();

      // Almacenamos el caché
      await this.cacheManager.set('news', data, 6000);

      return data;
    }

    return cacheNews;
  }

  @Get('top-headlines')
  // Intercede en la respuesta de la petición
  @UseInterceptors(CacheInterceptor)
  @CacheKey('top-headlines')
  @CacheTTL(60000)
  async topHeadlines() {
    const { data } = await this.newsService.getTopHeadlines();

    return data;
  }
}
